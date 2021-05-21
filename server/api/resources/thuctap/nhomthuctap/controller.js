import * as responseAction from '../../../utils/responseAction';
import queryHelper from '../../../helpers/queryHelper';
import * as Service from './service';
import Model from './model';
import CommonError from '../../../error/CommonError';
import * as ChiTietNhomThucTapService from './chitiet/service';

export async function findOne(req, res) {
  try {
    const { id } = req.params;
    const data = await Model.findOne({ _id: id, is_deleted: false })
      .populate({ path: 'id_dotthuctap', select: 'ten_dot' })
      .populate({ path: 'nam_hoc', select: 'nam_hoc' })
      .populate({ path: 'dia_diem', select: 'ten_dia_diem' })
      .populate({ path: 'id_giangvien', select: 'ten_giao_vien' })
      .lean();
    if (!data) {
      return responseAction.error(res, CommonError.NOT_FOUND());
    }
    data.chitiet = await ChiTietNhomThucTapService.getAll({ id_nhomthuctap: data._id, is_deleted: false })
      .populate({ path: 'id_sinhvien' }).lean();
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    const data = await Model.findOneAndUpdate({ _id: id }, { is_deleted: true }, { new: true }).lean();
    if (!data) {
      return responseAction.error(res, CommonError.NOT_FOUND());
    } else {
      await ChiTietNhomThucTapService.removeAll({ id_nhomthuctap: data._id });
      data.chitiet = await ChiTietNhomThucTapService.getAll({ id_nhomthuctap: data._id });
    }
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = Service.validate(req.body);
    if (error) return responseAction.error(res, error, 400);
    const data = await Model.findByIdAndUpdate(id, value, { new: true }).lean();
    if (!data) {
      return responseAction.error(res, CommonError.NOT_FOUND());
    } else {
      const chitiet = req.body.chitiet || [];
      const chitietUpdate = chitiet.filter(row => row._id);
      await ChiTietNhomThucTapService.updateAll(chitietUpdate);
      let chitietCreate = chitiet.filter(row => !row.hasOwnProperty('_id'));
      chitietCreate.forEach(row => row.id_nhomthuctap = data._id);
      await ChiTietNhomThucTapService.create(chitietCreate);
      data.chitiet = await ChiTietNhomThucTapService.getAll({ id_nhomthuctap: data._id, is_deleted: false })
        .populate({ path: 'id_sinhvien' });
    }
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function create(req, res) {
  try {
    const { error, value } = Service.validate(req.body);
    if (error) return responseAction.error(res, error, 400);
    let data = await Model.create(value);
    if (data && req.body.chitiet && Array.isArray(req.body.chitiet)) {
      data = data.toObject();
      req.body.chitiet.forEach(row => {
        row.id_nhomthuctap = data._id;
      });
      data.chitiet = await ChiTietNhomThucTapService.create(req.body.chitiet);
    }
    return responseAction.success(res, data);
  } catch (err) {
    console.error(err);
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req);
    const { criteria, options } = query;
    options.sort = { created_at: -1 }
    options.populate = [
      { path: 'id_dotthuctap', select: 'ten_dot' },
      { path: 'id_giangvien', select: 'ten_giao_vien' },
      { path: 'dia_diem', select: 'ten_dia_diem' },
      { path: 'nam_hoc', select: 'nam_hoc' },
    ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

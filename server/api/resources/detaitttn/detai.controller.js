import * as responseAction from '../../utils/responseAction';
import queryHelper from '../../helpers/queryHelper';
import * as Service from './detai.service';
import Model from './detai.model';
import FileService from './file/file.service';
import { DT_TRANG_THAI } from '../../constant/constant';

export async function findOne(req, res) {
  try {
    const { id } = req.params;
    const data = await Model.findById(id);
    if (!data) {
      return responseAction.error(res, 404, '');
    }
    return responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    const data = await Model.findOneAndUpdate({ _id: id }, { is_deleted: true }, { new: true });
    if (!data) {
      return responseAction.error(res, 404, '');
    }
    return responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;

    const { error, value } = Service.validate(req.body);
    if (error) return responseAction.error(res, error, 400);
    const isUnique = await Model.findOne({
      ma_de_tai: value.ma_de_tai,
      is_deleted: false,
      _id: { $ne: value._id },
    }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã đề tài đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({ path: 'ma_linh_vuc', select: 'ten_linh_luc' })
      .populate({ path: 'ma_nguoi_tao', select: 'full_name' })
      .populate({ path: 'ma_giang_vien', select: 'ten_giao_vien' })
      .populate({ path: 'tu_khoa', select: 'tu_khoa' });
    if (!data) {
      return responseAction.error(res, null, 404);
    }
    return responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function create(req, res) {

  try {
    const { error, value } = Service.validate(req.body);
    if (error) return responseAction.error(res, error, 400);
    const isUnique = await Model.findOne({ ma_de_tai: value.ma_de_tai, is_deleted: false }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã đề tài đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.create(value);
    let dataRtn = await data
      .populate({ path: 'ma_linh_vuc', select: 'ten_linh_luc' })
      .populate({ path: 'ma_nguoi_tao', select: 'full_name' })
      .populate({ path: 'tu_khoa', select: 'tu_khoa' })
      .populate({ path: 'ma_giang_vien', select: 'ten_giao_vien' }).execPopulate();
    return responseAction.success(res, dataRtn);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req, ['ten_giang_vien']);

    const { criteria, options } = query;
    options.sort = { created_at: -1 };
    options.populate = [
      { path: 'ma_linh_vuc', select: 'ten_linh_vuc' },
      { path: 'ma_nguoi_tao', select: 'full_name' },
      { path: 'ma_giang_vien', select: 'ten_giao_vien' },
      { path: 'tu_khoa', select: 'tu_khoa' },
      { path: 'nam_hoc', select: 'nam_hoc' },
    ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function getListDeTai(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req, ['ten_giang_vien']);

    const { criteria, options } = query;
    criteria.trang_thai = { $in: [DT_TRANG_THAI.CHUA_DUOC_DUYET, DT_TRANG_THAI.DA_DUOC_DUYET] };
    options.populate = [
      { path: 'ma_linh_vuc', select: 'ten_linh_vuc' },
      { path: 'ma_nguoi_tao', select: 'full_name' },
      { path: 'ma_giang_vien', select: 'ten_giao_vien' },
      { path: 'tu_khoa', select: 'tu_khoa' },
    ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function duplication(req, res) {
  try {
    const { id } = req.params;

    const { error, value } = Service.validate(req.body);
    const deTai = await Model.findOne({ _id: id, is_deleted: false }, { new: true });


    if (!deTai) {
      return responseAction.error(res, null, 404);
    }
    return responseAction.success(res, deTai);
  } catch (err) {
    responseAction.error(res, err);
  }
}

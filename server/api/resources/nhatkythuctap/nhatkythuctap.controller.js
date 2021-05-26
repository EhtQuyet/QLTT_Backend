import * as responseAction from '../../utils/responseAction';
import queryHelper from '../../helpers/queryHelper';
import * as Service from './nhatkythuctap.service';
import Model from './nhatkythuctap.model';
import ModelSV from './../quanlidanhmuc/sinhvientttn/sinhvien.model';

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
    const isUnique = await Model.findOne({ ma_sinh_vien: value.ma_sinh_vien, ngay: value.ngay, is_deleted: false, _id: { $ne: value._id } }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Nhật ký đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({path: 'ma_sinh_vien', select:'ten_sinh_vien'});
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
    const sinhVien = await ModelSV.findOne({ma_sinh_vien: value.ma_sinh_vien,  is_deleted: false}, { _id: 1 } )
    if(sinhVien) {
      value.ma_sinh_vien = await sinhVien._id;
    }
    else {
      return responseAction.error(res, { message: 'Mã sinh viên không tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const isUnique = await Model.findOne({ ma_sinh_vien: value.ma_sinh_vien, ngay: value.ngay, is_deleted: false }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Nhật ký đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.create(value);

    let dataRtn = await data
      .populate({ path: 'ma_sinh_vien', select: 'ten_sinh_vien ma_sinh_vien' }).execPopulate();
    return responseAction.success(res, dataRtn);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req);
    const { criteria, options } = query;
    options.sort = { created_at: -1 }
    options.populate = [
      { path: 'ma_sinh_vien', select: 'ten_sinh_vien ma_sinh_vien' },
    ];
    const data = await Model.paginate(criteria, options);
    console.log('data',data);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

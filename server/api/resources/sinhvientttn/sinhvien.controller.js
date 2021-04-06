import * as responseAction from '../../utils/responseAction';
import queryHelper from '../../helpers/queryHelper';
import userService from './../user/user.service';
import * as Service from './sinhvien.service';
import Model from './sinhvien.model';
import ModelUser from '../user/user.model';
import ModelLop from '../lophoc/lop.model';

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
    const isUnique = await Model.findOne({ ma_sinh_vien: value.ma_sinh_vien, is_deleted: false, _id: { $ne: value._id } }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã sinh viên đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({path: 'ma_lop_hoc', select:'ten_lop_hoc'});
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
    const isUnique = await Model.findOne({ ma_sinh_vien: value.ma_sinh_vien, is_deleted: false }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã sinh viên đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.create(value);
    const item =
      {
        full_name: data.ten_sinh_vien,
        username: data.ma_sinh_vien,
        password: userService.encryptPassword('1111'),
        email: data.email,
        gender: data.gioi_tinh,
        phone: data.sdt,
        role: 'SINH_VIEN'
      }
    const docs = await ModelUser.create(item);

    let dataRtn = await data
      .populate({ path: 'ma_lop_hoc', select: 'ten_lop_hoc' }).execPopulate();
    return responseAction.success(res, dataRtn);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function importSinhVien(req, res) {
  try {
    const { error, value } = Service.validate(req.body);
    console.log('value',value);
    if (error) return responseAction.error(res, error, 400);
    const isClass = await ModelLop.findOne({ ten_lop_hoc: value.ma_lop_hoc, is_deleted: false }, { _id: 1 });
    const isUnique = await Model.findOne({ ma_sinh_vien: value.ma_sinh_vien, is_deleted: false }, { _id: 1 });
    let err = []
    let data;
    if (isUnique)
      err = [...err, 'Mã sinh viên đã tồn tại'];
    if(!value.ten_sinh_vien)
      err = [...err, 'Tên sinh viên không được để trống'];
    if(!value.ma_lop_hoc)
      err = [...err, 'Tên lớp học không được để trống'];
    else if(!isClass)
      err = [...err, 'Tên lớp học không tồn tại'];
    if(isClass)
      value.ma_lop_hoc = isClass._id;
    if(err.length === 0){
      data = await Model.create(value);
    } else {
      return responseAction.success(res, err);
    }
    if(data) {
      const item =
        {
          full_name: data.ten_sinh_vien,
          username: data.ma_sinh_vien,
          password: userService.encryptPassword('1111'),
          email: data.email,
          gender: data.gioi_tinh,
          phone: data.sdt,
          role: 'SINH_VIEN'
        }
      const docs = await ModelUser.create(item);
    }

    let dataRtn = await data
      .populate({ path: 'ma_lop_hoc', select: 'ten_lop_hoc' }).execPopulate();
    return responseAction.success(res, dataRtn);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req, ['ten_lop_hoc']);
    const { criteria, options } = query;
    options.populate = [
      { path: 'ma_lop_hoc', select: 'ten_lop_hoc' },
    ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

import * as responseAction from '../../../utils/responseAction';
import queryHelper from '../../../helpers/queryHelper';
import * as Service from './giaovien.service';
import Model from './giaovien.model';
import ModelUser from '../../user/user.model';
import userService from '../../user/user.service';


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
    const isUnique = await Model.findOne({ ma_giao_vien: value.ma_giao_vien, is_deleted: false, _id: { $ne: value._id } }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã giáo viên đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({path: 'ma_bo_mon', select:'ten_bo_mon'});
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
    const isUnique = await Model.findOne({ ma_giao_vien: value.ma_giao_vien, is_deleted: false }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã giáo viên đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.create(value);
    const item =
      {
        full_name: data.ten_giao_vien,
        username: data.ma_giao_vien,
        password: userService.encryptPassword('1111'),
        email: data.email,
        gender: data.gioi_tinh,
        phone: data.sdt,
        role: 'GIANG_VIEN'
      }
    const docs = await ModelUser.create(item);
    let dataRtn = await data
      .populate({ path: 'ma_bo_mon', select: 'ten_bo_mon' }).execPopulate();
    return responseAction.success(res, dataRtn);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req, ['ten_giao_vien']);
    const { criteria, options } = query;
    options.populate = [
      { path: 'ma_bo_mon', select: 'ten_bo_mon' },
    ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

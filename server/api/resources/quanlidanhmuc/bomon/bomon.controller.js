import * as responseAction from '../../../utils/responseAction';
import queryHelper from '../../../helpers/queryHelper';
import * as Service from './bomon.service';
import Model from './bomon.model';

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
    const isUnique = await Model.findOne({ ma_bo_mon: value.ma_bo_mon, is_deleted: false, _id: { $ne: value._id } }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã bộ môn đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true });
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
    const isUnique = await Model.findOne({ ma_bo_mon: value.ma_bo_mon, is_deleted: false }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã bộ môn đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.create(value);
    return responseAction.success(res, data);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req, ['ten_bo_mon']);
    const { criteria, options } = query;
    options.sort = { created_at: -1 }
    // options.populate = [
    //   { path: 'id_don_vi', select: 'ten_don_vi' },
    // ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

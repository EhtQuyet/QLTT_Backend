import * as responseAction from '../../utils/responseAction';
import queryHelper from '../../helpers/queryHelper';
import * as Service from './ngachgv.service';
import Model from './ngachgv.model';

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
    const isUnique = await Model.findOne({ ma_nghach: value.ma_nghach, is_deleted: false, _id: { $ne: value._id } }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã ngạch giảng viên đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
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
    const isUnique = await Model.findOne({ ma_ngach: value.ma_nghach, is_deleted: false, _id: { $ne: value._id } }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Mã ngạch giảng viên đã tồn tại, vui lòng kiểm tra và thử lại' }, 400);
    }
    const data = await Model.create(value);
    return responseAction.success(res, data);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req, ['ten_ngach']);
    const { criteria, options } = query;
    options.sort = { created_at: -1 }
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

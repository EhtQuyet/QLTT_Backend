import * as responseAction from '../../../../utils/responseAction';
import queryHelper from '../../../../helpers/queryHelper';
import * as Service from './service';
import Model from './model';

export async function findOne(req, res) {
  try {
    const { id } = req.params;
    const data = await Model.findById(id)
      .populate({ path: 'id_sinhvien', select: 'ten_sinh_vien' })
      .lean();
    if (!data) {
      return responseAction.error(res, 404, '');
    }
    responseAction.success(res, data);
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

    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({ path: 'id_sinhvien', select: 'ten_sinh_vien ma_sinh_vien' });
    if (!data) {
      return responseAction.error(res, null, 404);
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
    const data = await Model.create(value);
    let dataRtn = await data
      .populate({ path: 'id_sinhvien', select: 'ten_sinh_vien ma_sinh_vien' }).execPopulate();
    return responseAction.success(res, dataRtn);
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
      { path: 'id_sinhvien', select: 'ten_sinh_vien ma_sinh_vien' },
    ];
    const data = await Model.paginate(criteria, options);

    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

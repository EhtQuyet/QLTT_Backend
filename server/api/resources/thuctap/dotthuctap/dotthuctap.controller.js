import * as responseAction from '../../../utils/responseAction';
import queryHelper from '../../../helpers/queryHelper';
import * as Service from './dotthuctap.service';
import Model from './dotthuctap.model';
import { DTT_TRANG_THAI } from '../../../constant/constant';

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
    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({path: 'namhoc', select:'nam_hoc'});
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
    const data = await Model.create(value);
    let dataRtn = await data
      .populate({ path: 'namhoc', select: 'nam_hoc' }).execPopulate();
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
      { path: 'namhoc', select: 'nam_hoc' }
    ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function getAllDK(req, res) {

  try {
    const query = queryHelper.extractQueryParam(req);
    const { criteria, options } = query;
    criteria.trang_thai = { $in: [DTT_TRANG_THAI.DA_KHOA , DTT_TRANG_THAI.DANG_MO] }
    options.sort = { created_at: -1 }
    options.populate = [
      { path: 'namhoc', select: 'nam_hoc' }
    ];
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }

}


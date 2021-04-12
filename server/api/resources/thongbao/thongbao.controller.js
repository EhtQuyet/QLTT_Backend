import Model from '../thongbao/thongbao.model';
import * as responseAction from '../../utils/responseAction';
import * as Service from '../thongbao/thongbao.service';
import { THONG_BAO } from '../../constant/constant';

export async function create(req, res) {
  try {
    const { error, value } = Service.validate(req.body);
    if (error) return responseAction.error(res, error, 400);
    const data = await Model.create(value);
    return responseAction.success(res, data);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function findOne(req, res) {
  try {
    const { key } = req.params;
    const data = await Model.findOne({sinh_vien: key, trang_thai: THONG_BAO.DA_GUI , is_deleted: false})
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
    const { key } = req.params;
    const { error, value } = Service.validate(req.body);
    if (error) return responseAction.error(res, error, 400);
    const data = await Model.findOneAndUpdate({ _id: key }, { trang_thai: THONG_BAO.DA_NHAN }, { new: true });
    if (!data) {
      return responseAction.error(res, null, 404);
    }
    return responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

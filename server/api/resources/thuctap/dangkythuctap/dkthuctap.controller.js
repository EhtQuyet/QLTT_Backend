import queryHelper from '../../../helpers/queryHelper';
import Model from './dkthuctap.model';
import SinhVienModel from '../../quanlidanhmuc/sinhvientttn/sinhvien.model';
import * as responseAction from '../../../utils/responseAction';
import * as Service from './dkthuctap.service';
import GiangVienModel from '../../quanlidanhmuc/giaovienhdtttn/giaovien.model'


export async function getAll(req, res) {

  try {
    const query = queryHelper.extractQueryParam(req);
    const { criteria, options } = query;
    console.log('query', query);
    options.sort = { created_at: -1 }
    options.populate = [
      { path: 'sinh_vien', select: 'ten_sinh_vien ma_sinh_vien' },
      { path: 'dia_diem_thuc_tap', select: 'dia_chi ten_dia_diem' },
      { path: 'dot_thuc_tap', select: 'ten_dot' },
      { path: 'giao_vien_huong_dan', select: 'ma_giao_vien ten_giao_vien' },
    ]
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }

}

export async function create(req, res) {
  try {
    const value = req.body;
    const isUnique = await Model.findOne({ sinh_vien: value.sinh_vien, dot_thuc_tap: value.dot_thuc_tap, is_deleted: false, _id: { $ne: value._id } }, { _id: 1 });
    if (isUnique) {
      return responseAction.error(res, { message: 'Sinh viên đã đăng ký thực tập, vui lòng kiểm tra lại' }, 400);
    }
    const data = await Model.create(value);
    let dataRtn = await data
      .populate({ path: 'sinh_vien', select: 'ten_sinh_vien ma_sinh_vien' })
      .populate({ path: 'dia_diem_thuc_tap', select: 'dia_chi ten_dia_diem' })
      .populate({ path: 'dot_thuc_tap', select: 'ten_dot' })
      .populate({ path: 'giao_vien_huong_dan', select: 'ma_giao_vien ten_giao_vien' }).execPopulate();
    return responseAction.success(res, dataRtn);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function findById(req, res) {
  try {
    const { id } = req.params;
    const data = await Model.findById(id);
    if (!data) {
      return responseAction.error(res, err, 404);
    }
    return responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function findOne(req, res) {
  try {
    const { id } = req.params;
    const sinhVien = await SinhVienModel.find({ ma_sinh_vien: id, is_deleted: false });
    const data = await Model.find({ sinh_vien: sinhVien[0]._id, is_delete: false });
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
      return responseAction.error(res, err, 400);
    }
    return responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function xacNhanHuongDan(req, res) {
  try {
    const value = req.body;
    console.log('value',value);
    console.log('value.giaovien_huongdan._id',value.giaovien_huongdan._id);
    const giangVien = await GiangVienModel.findById(value.giaovien_huongdan._id).populate({path: 'ma_ngach', selec: 'ma_ngach'});
    let sum = 0;
    if(giangVien.ma_ngach.ma_ngach === 'V.07.01.01')
      sum = 5;
    if(giangVien.ma_ngach.ma_ngach === 'V.07.01.02')
      sum = 3;


    const dangKyTT = await Model.find({dot_thuc_tap: value.dot_thuc_tap._id,giao_vien_huong_dan: value.giaovien_huongdan._id})

    console.log('dangKyTT',dangKyTT.length);
/// đang làm giở, mai làm tiếp
    // đếm số lượng sinh viên mà giảng viên hướng đãn
    // set lại trạng thái cho sinh viên
    if (!value) {
      return responseAction.error(res, null, 404);
    }
    return responseAction.success(res, value);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const value = req.body;
    const data = await Model.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({ path: 'sinh_vien', select: 'ma_sinh_vien ten_sinh_vien' })
      .populate({ path: 'dia_diem_thuc_tap', select: 'dia_chi ten_dia_diem' })
      .populate({ path: 'dot_thuc_tap', select: 'ten_dot' })
      .populate({ path: 'giao_vien_huong_dan', select: 'ma_giao_vien ten_giao_vien' });
    if (!data) {
      return responseAction.error(res, null, 404);
    }
    return responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

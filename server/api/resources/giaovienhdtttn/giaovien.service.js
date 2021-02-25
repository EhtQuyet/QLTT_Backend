import * as ValidatorHelper from '../../helpers/validatorHelper';

const Joi = require('joi');


const objSchema = Joi.object({
  ten_giao_vien: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên giáo viên')),
  ma_giao_vien: Joi.string().required().messages(ValidatorHelper.messageDefine('Mã giáo viên')),
  ngay_sinh: Joi.date().required().messages(ValidatorHelper.messageDefine('Ngày sinh')),
  gioi_tinh: Joi.string().required().messages(ValidatorHelper.messageDefine('Giới tính')),
  sdt: Joi.string().required().messages(ValidatorHelper.messageDefine('Số điện thoại')),
  email: Joi.string().required().messages(ValidatorHelper.messageDefine('Email')),
  hoc_vi: Joi.string().required().messages(ValidatorHelper.messageDefine('Học vị')),
  dia_chi: Joi.string().required().messages(ValidatorHelper.messageDefine('Địa chỉ')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}

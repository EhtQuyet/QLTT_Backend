import * as ValidatorHelper from '../../../helpers/validatorHelper';

const Joi = require('joi');


const objSchema = Joi.object({
  ten_sinh_vien: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên sinh viên')),
  ma_sinh_vien: Joi.string().required().messages(ValidatorHelper.messageDefine('Mã sinh viên')),
  ngay_sinh: Joi.date().required().messages(ValidatorHelper.messageDefine('Ngày sinh')),
  gioi_tinh: Joi.string().required().messages(ValidatorHelper.messageDefine('Giới tính')),
  sdt: Joi.string().required().messages(ValidatorHelper.messageDefine('Số điện thoại')),
  email: Joi.string().required().messages(ValidatorHelper.messageDefine('Email')),
  lop: Joi.string().required().messages(ValidatorHelper.messageDefine('Lớp')),
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

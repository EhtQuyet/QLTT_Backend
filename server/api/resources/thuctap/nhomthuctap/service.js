import * as ValidatorHelper from '../../../helpers/validatorHelper';
import NHOMTHUCTAP from './model';
const Joi = require('joi');

const objSchema = Joi.object({
  id_giangvien: Joi.string().required().messages(ValidatorHelper.messageDefine('Giảng viên hướng dẫn')),
  id_dotthuctap: Joi.string().required().messages(ValidatorHelper.messageDefine('Đợt thực tập')),
  dia_diem: Joi.string().required().messages(ValidatorHelper.messageDefine('Địa điểm thực tập')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}

export async function getAll(query) {
  return NHOMTHUCTAP.find(query).lean();
}

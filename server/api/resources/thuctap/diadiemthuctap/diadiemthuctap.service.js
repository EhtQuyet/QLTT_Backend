import * as ValidatorHelper from '../../../helpers/validatorHelper';

const Joi = require('joi');


const objSchema = Joi.object({
  ten_dia_diem: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên địa điểm')),
  dia_chi: Joi.string().required().messages(ValidatorHelper.messageDefine('Đại chỉ')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}

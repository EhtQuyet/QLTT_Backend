import * as ValidatorHelper from '../../helpers/validatorHelper';

const Joi = require('joi');


const objSchema = Joi.object({
  ten_bo_mon: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên bộ môn')),
  ma_bo_mon: Joi.string().required().messages(ValidatorHelper.messageDefine('Mã bộ môn')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}

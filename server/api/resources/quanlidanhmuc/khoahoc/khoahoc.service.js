import * as ValidatorHelper from '../../../helpers/validatorHelper';

const Joi = require('joi');


const objSchema = Joi.object({
  ten_khoa: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên khóa học')),
  ma_khoa: Joi.string().required().messages(ValidatorHelper.messageDefine('Mã khóa học')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}

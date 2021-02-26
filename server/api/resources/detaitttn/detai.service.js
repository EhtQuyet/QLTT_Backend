import * as ValidatorHelper from '../../helpers/validatorHelper';

const Joi = require('joi');


const objSchema = Joi.object({
  ten_de_tai: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên đề tài')),
  ma_de_tai: Joi.string().required().messages(ValidatorHelper.messageDefine('Mã đề tài')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}

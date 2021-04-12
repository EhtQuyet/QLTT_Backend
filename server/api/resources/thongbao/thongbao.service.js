import * as ValidatorHelper from '../../helpers/validatorHelper';

const Joi = require('joi');


const objSchema = Joi.object({
  tieu_de: Joi.string().required().messages(ValidatorHelper.messageDefine('Tiêu đề')),
  noi_dung: Joi.string().required().messages(ValidatorHelper.messageDefine('Nội dung')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}

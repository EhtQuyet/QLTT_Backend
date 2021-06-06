import * as ValidatorHelper from '../../../helpers/validatorHelper';
import FILE from './file.model';

const Joi = require('joi');

const objSchema = Joi.object({
  file_name: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên file')),
  detai_id: Joi.string().required().messages(ValidatorHelper.messageDefine('Tên đề tài')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
  if (error && error.details) {
    return { error };
  }
  return { value };
}
export function getAll(query) {
  return FILE.find(query).lean();
}

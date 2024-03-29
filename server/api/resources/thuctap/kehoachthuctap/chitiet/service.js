import * as ValidatorHelper from '../../../../helpers/validatorHelper';
import KEHOACH_CHITIET from './model';

const Joi = require('joi');

export async function create(data) {
  const { error, value } = validate(data);
  if (error) throw error;
  return KEHOACH_CHITIET.create(value);
}

export async function updateAll(chitietUpdate) {
  for (const row of chitietUpdate) {
    const { error, value } = validate(row);
    if (error) throw error;
    await KEHOACH_CHITIET.findByIdAndUpdate(value._id, value);
  }
}

export function getAll(query) {
  return KEHOACH_CHITIET.find(query).lean();
}


export async function removeAll(query) {
  return KEHOACH_CHITIET.updateMany(query, { is_deleted: true });
}

const objSchema = Joi.object({
  id_kehoach: Joi.string().required().messages(ValidatorHelper.messageDefine('Kế hoạch')),
});

export function validate(data, method) {
  let schema = ValidatorHelper.createValidatorSchema(objSchema, data, method);
  if (Array.isArray(data)) {
    let validateError = null;
    data.find(itemData => {
      const { value, error } = schema.validate(itemData, { allowUnknown: true, abortEarly: true });
      if (error) validateError = error;
      return error;
    });
    if (validateError && validateError.details) {
      return { validateError };
    }
    return { value: data };
  } else {
    const { value, error } = schema.validate(data, { allowUnknown: true, abortEarly: true });
    if (error && error.details) {
      return { error };
    }
    return { value };
  }
}

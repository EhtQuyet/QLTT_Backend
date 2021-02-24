
export const messageDefine = (key) => {
  return {
    'string.base': `${key} không đúng`,
    'number.base': `${key} không đúng`,
    'array.base': `${key} không đúng`,
    'string.empty': `${key} là không được bỏ trống`,
    'any.required': `${key} là không được thiếu`,
  };
};

const Joi = require('joi');

export function createValidatorSchema(objSchema, body, method) {
  body = body || {}
  let newSchema = {};
  if (method === 'POST') {
    newSchema = Object.assign({}, objSchema);
  } else {
    for (let key in objSchema) {
      if (objSchema.hasOwnProperty(key) && body.hasOwnProperty(key)) {
        newSchema[key] = objSchema[key];
      }
    }
  }
  return Joi.object().keys(newSchema);
}

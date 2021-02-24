import Joi from 'joi';
import bcrypt from 'bcryptjs';

const messageDefine = (key) => {
  return {
    'string.base': `${key} không đúng`,
    'number.base': `${key} không đúng`,
    'array.base': `${key} không đúng`,
    'string.empty': `${key} là không được bỏ trống`,
    'any.required': `${key} là không được thiếu`,
  };
};

export default {
  encryptPassword(palinText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(palinText, salt);
  },
  comparePassword(plainText, encrypedPassword) {
    return bcrypt.compareSync(plainText, encrypedPassword);
  },
  validateSignup(body, method) {

    let objSchema = {
      full_name: Joi.string().required().messages(messageDefine('Tên nhân viên')),
      email: Joi.string().messages(messageDefine('Email')),
      username: Joi.string().required().messages(messageDefine('Tài khoản')),
      gender: Joi.string().allow(''),
      phone: Joi.string().required().messages(messageDefine('Điện thoại')),
      birthday: Joi.string().allow('').allow(null),
    };

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

    let schema = Joi.object().keys(newSchema);
    const { value, error } = schema.validate(body, { allowUnknown: true, abortEarly: true });
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  validateLogin(body) {
    const schema = Joi.object().keys({
      username: Joi.string().required().messages(messageDefine('Tài khoản')),
      password: Joi.string().required().messages(messageDefine('Mật khẩu')),
    });
    const { value, error } = schema.validate(body);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};

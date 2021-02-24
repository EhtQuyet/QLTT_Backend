import {getMessageError} from '../constant/messageError';
import {getMessage} from '../constant/messageSuccess'
import CommonError from "../error/CommonError";

export function success(res, docs, code = 200, message = undefined) {

  // save log system.
  let messageSuccess = getMessage(message, res.lang_id || 'vi');
  try {
    res.status(code).json({
      success: true,
      data: docs,
      message: messageSuccess
    });
  } catch (e) {
    console.log(e)
  }
}

export function error(res, err = CommonError.UNEXPECTED_ERROR, code = err && err.status_code || 400, message = err.message) {
  let messageErr = getMessageError(message, err, res.lang_id || 'vi')
  let response = {
    success: false,
    message: messageErr,
    data: err
  };
  try {
    return res.status(code).json(response);
  } catch (e) {
    console.log(e)
  }
}

import {createError} from "../common/errorHelper";

export default {
  DUPLICATE_CODE: () => createError(400, 'DUPLICATE_CODE'),
  DUPLICATE_USERNAME: () => createError(400, 'DUPLICATE_USERNAME')
}
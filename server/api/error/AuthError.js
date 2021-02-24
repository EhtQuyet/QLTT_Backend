import {createError} from "../common/errorHelper";

export default {
  INVALID_TOKEN: () => createError(401, 'VALIDATION_TOKEN')
}
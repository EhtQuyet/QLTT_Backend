import {createError} from "../helpers/errorHelper";

export default {
  UNEXPECTED_ERROR: () => createError(500, 'OTHER_ERROR'),
  VALIDATION_ERROR: () => createError(400, 'VALIDATION_ERROR'),
  NOT_FOUND: () => createError(404, 'NOT_FOUND'),
}

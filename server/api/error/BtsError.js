import {createError} from "../common/errorHelper";

export default {
  BTS_NOT_FOUND: () => createError(400, 'BTS_NOT_FOUND'),
  DOCUMENT_TYPE_NOT_SUPPORTED: () => createError(400, 'DOCUMENT_TYPE_NOT_SUPPORTED'),
}
export const VALIDATION_ERROR = 'VALIDATION_ERROR'
export const VALIDATION_CODE_ITEM = 'VALIDATION_CODE_ITEM'
export const VALIDATION_FILE = 'VALIDATION_FILE'
export const NOT_FOUND_MODEL = 'NOT_FOUND_MODEL'
export const NOT_FOUND_USER = 'NOT_FOUND_USER'
export const NOT_FOUND_IMAGE = 'NOT_FOUND_IMAGE'
export const NOT_FOUND_CATEGORY = 'NOT_FOUND_CATEGORY'
export const NOT_FOUND_DRONE = 'NOT_FOUND_CATEGORY'
export const NOT_FOUND_ADMIN_UNIT = 'NOT_FOUND_ADMIN_UNIT'

export const FILE_MISSING = 'FILE_MISSING'
export const FILE_UPLOAD = 'FILE_UPLOAD'
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS'
export const OTHER_ERROR = 'OTHER_ERROR'
export const DUPLICATE_KEY = 'DUPLICATE_KEY'
export const DUPLICATE_CATEGORY_CODE = 'DUPLICATE_CATEGORY_CODE'
export const DUPLICATE_LINE_CODE = 'DUPLICATE_LINE_CODE'
export const EMAIL_NOT_EXISTED = 'EMAIL_NOT_EXISTED'
export const VALIDATION_TOKEN = 'VALIDATION_TOKEN'
export const VALIDATION_DRONE_STATUS = 'VALIDATION_DRONE_STATUS'
export const NO_TOKEN = 'NO_TOKEN'
export const CANNT_EDIT = 'CANNOT_EDIT'
export const CATE_DONT_HAVE_POSI_RECORD = 'CATE_DONT_HAVE_POSI_RECORD'
export const ITEM_DONT_HAVE_POSI_RECORD = 'ITEM_DONT_HAVE_POSI_RECORD'
export const POSI_DONT_HAVE_POSI_RECORD = 'POSI_DONT_HAVE_POSI_RECORD'
export const DUPLICATE_POSITION_NAME_DATA = 'DUPLICATE_POSITION_NAME_DATA';


const messageError = {
  DOCUMENT_TYPE_NOT_SUPPORTED: {
    vi: 'Loại tài liệu không hỗ trợ',
    en: 'Unsupported Document Type'
  },
  OTHER_ERROR: {
    vi: 'Có lỗi không mong muốn xin vui lòng liên hệ quản trị viên',
    en: 'other error'
  },
  NOT_FOUND_MODEL: {
    vi: 'Không tìm thấy đối tượng',
    en: 'not fount model'
  },
  DUPLICATE_POSITION_NAME_DATA: {
    vi: 'Tên vị trí đã tồn tại, vui lòng kiểm tra và thử lại',
    en: 'Position name existed, please check and try again'
  },
  // inspection model
  INSPECTION_PROCESSING: {
    vi: 'Không thể xoá đợt kiểm tra đã tiến hành kiểm tra, vui lòng kiểm tra và thử lại.',
    en: 'can\'t inspection is processing, please check and try again.'
  },
  INSPECTION_NOT_EXITS: {
    vi: 'Đợt kiểm tra không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Inspection does not exist or deleted, please check and try again.'
  },
  INSPECTION_ERROR_START_DATE: {
    vi: 'Ngày bắt đầu kiểm tra lớn hơn ngày bắt đầu của một trạm kiểm tra, vui lòng kiểm tra và thử lại',
    en: 'start date is invalid'
  },
  INSPECTION_ERROR_DUE_DATE: {
    vi: 'Ngày kết thúc kiểm tra nhỏ hơn ngày kết thúc của một trạm kiểm tra, vui lòng kiểm tra và thử lại.',
    en: 'end date is invalid'
  },
  INSPECTION_RECORD_ERROR_START_DATE: {
    vi: 'Ngày bắt đầu kiểm tra nhỏ hơn ngày bắt đầu của đợt kiểm tra, vui lòng kiểm tra và thử lại',
    en: 'start date is invalid'
  },
  INSPECTION_RECORD_ERROR_DUE_DATE: {
    vi: 'Ngày kết thúc kiểm tra lớn hơn ngày kết thúc của đợt kiểm tra, vui lòng kiểm tra và thử lại.',
    en: 'end date is invalid'
  },
  VALIDATION_TOKEN: {
    vi: 'Token không hợp lệ hoặc đã hết hạn, vui lòng kiểm tra lại.',
    en: 'Token is invalid or has expired, please login again.'
  },
  NO_TOKEN: {
    vi: 'Request bị từ trối vì yêu cầu cần token xác thực',
    en: 'Request is rejected because it requires an authentication token'
  },
  INSPECTION_RECORD_NOT_EXISTED: {
    vi: 'Đợt kiểm tra trạm không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Inspection record is not existed or deleted, please check and try again.'
  },
  BTSCONFIG_NOT_EXISTED: {
    vi: 'Trạm chưa có cấu hình tự động, vui lòng kiểm tra và thử lại.',
    en: 'The station is not configured automatically, please check and try again.'
  },

  NOT_FOUND_BTS: {
    vi: 'Vị trí không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại',
    en: 'Object not exist or deleted, please check and try again.'
  },
  ERR_BTS_EXITSED: {
    vi: 'Bts đã tồn tại, vui lòng kiểm tra và thử lại.',
    en: 'Code\'s existed, please check and try again.'
  },
  CATEGORY_WITHOUT_ITEM: {
    vi: 'Hạng mục không có thiết bị, vui lòng kiểm tra và thử lại.',
    en: 'Category without item, please check and try again.'
  },
  ERR_ITEM_CODE_EXIST: {
    vi: 'Mã thiết bị đã tồn tại, vui lòng kiểm tra và thử lại',
    en: 'Item code existed, please check and try again.'
  },
  ERR_ITEM_NOT_EXIST: {
    vi: 'Thiết bị không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Item not exist or deleted, please check and try again.'
  },
  ERR_COMPARE_PASSWORD_FAILT: {
    vi: 'Mật khẩu hiện tại không đúng, vui lòng kiểm tra và thử lại',
    en: 'password current failt, please check and try again'
  },
  ERR_ITEM_RECORD_NOT_EXIST: {
    vi: 'Thông tin kiểm tra của thiết bị không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Information item not exist or deleted, please check and try again.'
  },
  ERR_GET_DATA: {
    vi: 'Có lỗi trong quá trình truy vấn dữ liệu, vui lòng báo cáo lại quản trị viên',
    en: ' have error when get data, please report admin'
  },
  ERR_DELETE_DATA: {
    vi: 'Có lỗi trong quá trình xoá dữ liệu, vui lòng báo cáo lại quản trị viên',
    en: ' have error when delete data, please report admin'
  },
  ERR_ADD_DATA: {
    vi: 'Có lỗi trong quá trình thêm mới dữ liệu, vui lòng báo cáo lại quản trị viên',
    en: ' have error when add new data, please report admin'
  },
  ERR_UPDATE_DATA: {
    vi: 'Có lỗi trong quá trình cập nhật dữ liệu, vui lòng báo cáo lại quản trị viên',
    en: ' have error when update data, please report admin'
  },
  ERR_DUPLICATE_EMAIL: {
    vi: 'Email đã tồn tại, vui lòng kiểm tra và thử lại',
    en: 'Email already exists, please check and try again'
  },
  DUPLICATE_CODE: {
    vi: 'Mã nhân viên đã tồn tại',
    en: 'Code already exists'
  },
  DUPLICATE_USERNAME: {
    vi: 'Tên tài khoản đã tồn tại',
    en: 'User name already exists'
  },
  DUPLICATE_KEY: {
    vi: 'Dữ liệu đã tồn tại',
    en: 'Data already exists'
  },
  DUPLICATE_CATEGORY_CODE: {
    vi: 'Mã hạng mục đã tồn tại',
    en: 'Data already exists'
  },
  DUPLICATE_LINE_CODE: {
    vi: 'Mã đường dây đã tồn tại',
    en: 'Data already exists'
  },
  DUPLICATE_CHECKLIST: {
    vi: 'Tên tiêu chí đã tồn tại',
    en: 'Criteria name already exists'
  },
  VALIDATION_ERROR: {
    vi: 'Dữ liệu không phù hợp',
    en: 'Validation error'
  },
  ERR_QUERY_BY_INSP_RECORD_NOT_EXITS: {
    vi: 'Bạn thiếu thông tin truy vấn theo cuộc kiểm tra, vui lòng kiểm tra và thử lại',
    en: 'You can not query when lack of information, please check and try again'
  },
  ERR_INSPECTION_RECORD_RATING_NOT_EXISTED: {
    vi: 'Đánh giá đợt kiểm tra không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Inspection record rating not exist or deleted, please check and try again.'
  },
  ERR_WRONG_PASSWORD: {
    vi: 'Nhập sai mật khẩu.',
    en: "Enter wrong password."
  },
  ERR_ACCOUNT_DOES_NOT_EXIST: {
    vi: 'Tài khoản không tồn tại.',
    en: "Account does not exist."
  },
  ERR_NOT_FOUND_BTS_QUERY: {
    vi: 'Điều kiện tìm kiếm theo vị trí không tồn tại, vui lòng kiểm tra lại',
    en: 'Condition query object not exist, please check and try again'
  },
  ERR_UNIT_NOT_EXIST: {
    vi: 'Đơn vị không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Unit is not exist or deleted, please check and try again.'
  },
  ERR_CAN_NOT_DELETE_UNIT: {
    vi: 'Bạn không thể xoá đơn vị, vì đơn vị đã được dùng để tạo dữ liệu, vui lòng kiểm tra và thử lại',
    en: 'You can not delete the unit, because the unit used to create data, please check and try again'
  },
  ERR_UNIT_NAME_IS_REQUIRED: {
    vi: 'Tên đơn vị là trường bắt buộc, vui lòng kiểm tra và thử lại',
    en: 'Unit name is required, please check and try again'
  },
  ERR_UNIT_CODE_EXIST: {
    vi: 'Mã đơn vị đã tồn tại, vui lòng kiểm tra và thử lại',
    en: 'Unit code is existed, please check and try again'
  },

  ERR_BTS_HAVE_INSPECTION_RECORD: {
    vi: 'Bạn không thể xoá vị trí đã có dữ liệu kiểm tra. Vui lòng kiểm tra và thử lại',
    en: 'You can not delete object, because object have inspection record. Please check and try again'
  },
  ERR_BTS_ATTRIBUTE_NAME_EXITSED: {
    vi: 'Tên thuộc tính vị trí đã tồn tại, vui lòng kiểm tra và thử lại.',
    en: 'Bts attribute name\'s existed, please check and try again.'
  },
  ERR_BTS_TYPE_NAME_IS_REQUIRED: {
    vi: 'Tên loại vị trí là bắt buộc nhập, vui lòng kiểm tra và thử lại.',
    en: 'Bts type name is required, please check and try again.'
  },
  ERR_BTS_TYPE_USED: {
    vi: 'Vui lòng xoá hết các vị trí sử dụng loại trạm này trước khi xoá',
    en: 'You can not delete bts type used create data BTS, please check and try again'
  },
  ERR_INSP_STATUS_NOT_EXIST: {
    vi: 'Trạng thái kiểm tra đã bị xoá hoặc không tồn tại, vui lòng kiểm tra và thử lại.',
    en: 'Inspection status is deleted or not exist, please check and try again'
  },
  ERR_USER_NOT_EXIST: {
    vi: 'Nhân viên đã bị xoá hoặc không tồn tại, vui lòng kiểm tra và thử lại',
    en: 'User has been deleted or does not exist, please check and try again'
  },
  ERR_FILE_MISSING: {
    vi: 'Chưa có dữ liệu tải lên, vui lòng kiểm tra và thử lại',
    en: 'No data uploads yet, please check and try again'
  },
  ERR_PERMISION_UNIT: {
    vi: 'Bạn không có quyền truy vấn dữ liệu ở đơn vị đang đang tìm kiếm, vui lòng kiểm tra và thử lại',
    en: 'You don\'t have permision query data from unit, please check and try again.'
  },
  ERR_USER_DUPLICATE_CODE: {
    vi: 'Mã nhân viên đã tồn tại, vui lòng kiểm tra và thử lại',
    en: 'User code has been existed, please check and try again'
  },
  ERR_INSPECTION_STATUS_SYSTEM: {
    vi: 'Bạn không thể xoá trạng thái mặc định của hệ thống, vui lòng kiểm tra và thử lại',
    en: 'You can not delete inspection status default system, please check and try again'
  },
  ERR_INSPECTION_STATUS_USED: {
    vi: 'Bạn không thể xoá trạng thái kiểm tra, vì trạng thái đã được dùng để tạo dữ liệu kiểm tra, vui lòng kiểm tra và thử lại',
    en: 'You can not delete inspection status, because status used create data inspection, please check and try again'
  },
  ERR_BTS_CODE_EXIST: {
    vi: 'Mã vị trí đã tồn tại, vui lòng kiểm tra và thử lại',
    en: 'Bts code is existed, please check and try again'
  },
  ERR_BTS_NOT_EXIST: {
    vi: 'Vị trí không đã tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại',
    en: 'Bts is not exist or deleted, please check and try again'
  },
  ERR_DATA_NOT_EXITS: {
    vi: 'Dữ liệu không tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại',
    en: 'Data not exist or deleted, please check and try again'
  },
  ERR_VALIDATE_STATUS: {
    vi: 'Trạng thái không hợp lệ, vui lòng kiểm tra và thử lại.',
    en: 'Invalid status, please check and try again.'
  },
  ERR_DRONE_CODE_EXIST: {
    vi: 'Mã drone đã tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Drone code has been exist or deleted, please check and try again.'
  },
  ERR_DRONE_SERI_EXIST: {
    vi: 'Số Seri drone đã tồn tại hoặc đã bị xoá, vui lòng kiểm tra và thử lại.',
    en: 'Drone seri has been exist or deleted, please check and try again.'
  },
  ERR_VALIDATION_FILE_IMAGE: {
    vi: 'Bạn chưa có dữ liệu ảnh tải lên',
    en: 'You don\'t have data image upload'
  },
  ERR_POSITION_IMAGE_NOT_EXIST: {
    vi: 'Dữ liệu được tạo không có vị trí chụp ảnh',
    en: 'Data create don\'t have position'
  },
  ERR_INSP_RECORD_FOR_BTS_EXISTS: {
    vi: 'Bạn không thể tạo 2 kiểm tra cho cùng 1 vị trí trong 1 đợt kiểm tra',
    en: 'You can not create 2 inspection record for 1 BTS in 1 inspection'
  },
  ERR_INSP_ACCEPTANCE_FOR_BTS_EXISTS: {
    vi: 'Khảo sát nghiệm thu cho vị trí đã tồn tại, vui lòng kiểm tra và thử lại',
    en: 'inspection acceptance for BTS existed, please check and try again'
  },
  ERR_DELETE_INSPECTION_RECORD_END: {
    vi: 'Bạn không thể xoá cuộc kiểm tra đã hoàn thành, vui lòng kiểm tra và thử lại',
    en: 'You can not delete inspection record is done, please check and try again'
  },
  ERR_EMAIL_NOT_EXISTED: {
    vi: 'Email không tồn tại',
    en: 'Email not exist'
  },
  ERR_IMAGE_ID_REQUIRED: {
    vi: 'Tên ảnh bắt buộc nhập, vui lòng kiểm tra và thử lại.',
    en: 'Image name name is required, please check and try again.'
  },
  ERR_QUERY_IMAGE_ID_REQUIRED: {
    vi: 'Điều kiện tìm kiếm theo tên ảnh là bắt buộc',
    en: 'Condition query by image name is required'
  },
  ERR_API_NOT_FOUND: {
    vi: 'Không tìm thấy API',
    en: 'API not found'
  },
  ERR_LINE_TYPE_USED: {
    vi: 'Vui lòng xoá hết các trạm đường dây đang sử dụng loại này trước khi xoá',
    en: 'You can not delete this type used create data line, please check and try again'
  },
  BTS_NOT_FOUND: {
    vi: 'Không tồn tại BTS',
    en: 'Bts not exist'
  },
  BTS_IMPORT_FAIL: {
    vi: 'Nhập dữ liệu Bts không thành công',
    en: 'BTS_IMPORT_FAIL'
  },
}

export function getMessageError(message, err, lang_id) {

  if (messageError[message] && messageError[message][lang_id]) {
    return messageError[message][lang_id]
  } else {
    if (!message && typeof err === 'object' && err) {
      switch (err.name) {
        case 'ValidationError':
          return messageError.VALIDATION_ERROR[lang_id];
        case 'CastError':
          return messageError.VALIDATION_ERROR[lang_id];
        default :
          if (err.errmsg && err.errmsg.includes('duplicate key') > 0) {
            return messageError.DUPLICATE_KEY[lang_id];
          }
      }

      if (messageError.OTHER_ERROR[lang_id])
        return messageError.OTHER_ERROR[lang_id]
      else
        return messageError.OTHER_ERROR[lang_id]
    } else {
      if (message && typeof message === 'string') {
        return message
      } else {
        if (messageError.OTHER_ERROR[lang_id])
          return messageError.OTHER_ERROR[lang_id]
        else
          return messageError.OTHER_ERROR.vi
      }
    }
  }
}
import mongoose, { Schema } from 'mongoose';
import { GIAOVIEN, DETAI, USER, BOMON } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DT_TRANG_THAI } from '../../constant/constant';

const schema = new Schema({
  ten_de_tai: { type: String, required: true, validate: /\S+/ },
  ma_de_tai: { type: String, required: true, validate: /\S+/, unique: true },
  ngay_tao: { type: Date, required: true },
  trang_thai: {
    type: String,
    enum: Object.values(DT_TRANG_THAI),
    default: DT_TRANG_THAI.CHUA_DUOC_DUYET,
  },
  trang_thai_dang_ky: {
    type: String,
    enum: Object.values(DT_TRANG_THAI),
    default: DT_TRANG_THAI.CHUA_DANG_KY,
  },
  ma_giao_vien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GIAOVIEN,
  },
  ma_nguoi_tao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
  ma_nguoi_dang_ky: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
  ma_bo_mon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BOMON,
  },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(DETAI, schema);

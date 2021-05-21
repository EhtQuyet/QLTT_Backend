import mongoose, { Schema } from 'mongoose';
import { GIAOVIEN, DETAI, USER, BOMON, LINHVUC, NAMHOC} from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DT_TRANG_THAI } from '../../constant/constant';

const schema = new Schema({
  ten_de_tai: { type: String, required: true, validate: /\S+/ },
  ma_de_tai: { type: String, required: true, validate: /\S+/, unique: true },
  ma_giang_vien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GIAOVIEN,
  },
  ma_nguoi_tao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
  ma_linh_vuc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LINHVUC,
  },
  nam_hoc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: NAMHOC,
  },
  trang_thai: {
    type: String,
    enum: Object.values(DT_TRANG_THAI),
    default: DT_TRANG_THAI.CHUA_DUOC_DUYET,
  },

  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(DETAI, schema);

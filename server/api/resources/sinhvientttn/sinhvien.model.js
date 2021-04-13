import mongoose, { Schema } from 'mongoose';
import { LOPHOC, SINHVIEN } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { TRANG_THAI } from '../../constant/constant';

const schema = new Schema({
  ten_sinh_vien: { type: String, required: true, validate: /\S+/ },
  ma_sinh_vien: { type: String, required: true, validate: /\S+/, unique: true },
  ngay_sinh: { type: Date, validate: /\S+/ },
  gioi_tinh: { type: String, validate: /\S+/ },
  sdt: { type: String, validate: /\S+/ },
  email: { type: String},
  ma_lop_hoc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LOPHOC,
    required: true,
  },
  // trang_thai:{
  //   type: String,
  //   enum: Object.values(TRANG_THAI),
  //   default: TRANG_THAI.CHUA_DANG_KY,
  // },
  dia_chi: { type: String },
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
export default mongoose.model(SINHVIEN, schema);

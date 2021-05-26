import mongoose, { Schema } from 'mongoose';
import { NHATKY, SINHVIEN } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { NHAT_KY } from '../../constant/constant';

const schema = new Schema({
  ma_sinh_vien: { type: mongoose.Schema.Types.ObjectId, required: true, ref: SINHVIEN},
  ngay: { type: Date, validate: /\S+/ },
  dia_diem: { type: String },
  cong_viec: { type: String },
  ket_qua: { type: String },
  nhan_xet: { type: String },

  trang_thai:{
    type: String,
    enum: Object.values(NHAT_KY),
    default: NHAT_KY.HOAN_THANH,
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
export default mongoose.model(NHATKY, schema);

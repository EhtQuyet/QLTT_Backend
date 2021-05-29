import mongoose, { Schema } from 'mongoose';
import { DIADIEMTHUCTAP, GIAOVIEN, SINHVIEN, DOTTHUCTAP, NHIEMVUSINHVIEN } from '../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { NHIEM_VU } from '../../../constant/constant';

const schema = new Schema({
  sinh_vien: { type: mongoose.Schema.Types.ObjectId, required: true, ref: SINHVIEN},
  dot_thuc_tap: { type: mongoose.Schema.Types.ObjectId, required: true, ref: DOTTHUCTAP},
  giang_vien: {type: mongoose.Schema.Types.ObjectId, required: true, ref: GIAOVIEN},
  noi_dung: {type: String},
  yeu_cau: {type: String},
  ket_qua: {type: String},
  trang_thai: {
    type: String,
    enum: Object.values(NHIEM_VU),
    default: NHIEM_VU.DA_GIAO,
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
export default mongoose.model(NHIEMVUSINHVIEN, schema);

import mongoose, { Schema } from 'mongoose';
import { CHITIET_NHOMTHUCTAP, DANGKYTHUCTAP, NHOMTHUCTAP, SINHVIEN } from '../../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  id_nhomthuctap: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: NHOMTHUCTAP,
  },
  id_sinhvien: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: SINHVIEN,
  },
  ma_sinh_vien: {
    type: String, required: true,
  },
  diem_tbtl: { type: Number, required: true },
  so_tctl: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});
schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(CHITIET_NHOMTHUCTAP, schema);

import mongoose, { Schema } from 'mongoose';
import { GIAOVIEN, BOMON } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_giao_vien: { type: String, required: true, validate: /\S+/ },
  ma_giao_vien: { type: String, required: true, validate: /\S+/, unique: true },
  ngay_sinh: { type: Date, required: true, validate: /\S+/ },
  gioi_tinh: { type: String, required: true, validate: /\S+/ },
  sdt: { type: String, validate: /\S+/ },
  email: { type: String, required: true },
  hoc_vi: { type: String, required: true },
  dia_chi: { type: String},
  ma_bo_mon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BOMON
  },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(GIAOVIEN, schema);

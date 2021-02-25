import mongoose, { Schema } from 'mongoose';
import { SINHVIEN } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_sinh_vien: { type: String, required: true, validate: /\S+/ },
  ma_sinh_vien: { type: String, required: true, validate: /\S+/, unique: true },
  ngay_sinh: { type: Date, required: true, validate: /\S+/ },
  gioi_tinh: { type: String, required: true, validate: /\S+/ },
  sdt: { type: String, validate: /\S+/ },
  email: { type: String, required: true },
  ma_lop: { type: String, required: true },
  dia_chi: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(SINHVIEN, schema);

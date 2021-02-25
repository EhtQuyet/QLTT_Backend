import mongoose, { Schema } from 'mongoose';
import { KHOAHOC } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_khoa: { type: String, required: true, validate: /\S+/ },
  ma_khoa: { type: String, required: true, validate: /\S+/, unique: true },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(KHOAHOC, schema);

import mongoose, { Schema } from 'mongoose';
import { BOMON } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_bo_mon: { type: String, required: true, validate: /\S+/ },
  ma_bo_mon: { type: String, required: true, validate: /\S+/, unique: true },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(BOMON, schema);

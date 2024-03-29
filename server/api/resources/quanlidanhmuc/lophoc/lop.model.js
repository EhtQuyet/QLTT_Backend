import mongoose, { Schema } from 'mongoose';
import { KHOAHOC, LOPHOC } from '../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_lop_hoc: { type: String, required: true, validate: /\S+/ },
  ma_lop_hoc: { type: String, required: true, validate: /\S+/, unique: true },
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
export default mongoose.model(LOPHOC, schema);

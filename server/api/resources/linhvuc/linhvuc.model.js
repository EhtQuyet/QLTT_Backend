import mongoose, { Schema } from 'mongoose';
import { LINHVUC } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_linh_vuc: { type: String, required: true, validate: /\S+/ },
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
export default mongoose.model(LINHVUC, schema);

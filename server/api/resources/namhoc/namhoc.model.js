import mongoose, { Schema } from 'mongoose';
import { NAMHOC } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  nam_hoc: { type: String, required: true, validate: /\S+/ },
  thu_tu: { type: String, required: false, validate: /\S+/},
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
export default mongoose.model(NAMHOC, schema);

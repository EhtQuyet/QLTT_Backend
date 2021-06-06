import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { DETAI, FILE } from '../../../constant/dbCollections';

const schema = new Schema({
  detai_id: {type: Schema.Types.ObjectId, ref: DETAI},
  file_id: { type: String },
  file_name: { type: String },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
});

schema.plugin(mongoosePaginate);
export default mongoose.model(FILE, schema);

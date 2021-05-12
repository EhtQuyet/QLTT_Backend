import mongoose, { Schema } from 'mongoose';
import { NGACHGIANGVIEN } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ma_ngach: { type: String, required: true, validate: /\S+/, unique: true },
  ten_ngach: { type: String, required: true, validate: /\S+/, unique: true },
  mo_ta: { type: String},
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
export default mongoose.model(NGACHGIANGVIEN, schema);

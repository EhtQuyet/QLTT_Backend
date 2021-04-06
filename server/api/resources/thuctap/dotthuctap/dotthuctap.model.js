import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { NAMHOC, DOTTHUCTAP } from '../../../constant/dbCollections';

const schema = new Schema({
  namhoc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: NAMHOC
  },
  thoigian_batdau: { type: Date },
  thoigian_ketthuc: { type: Date },
  ten_dot: { type: String, required: true, },
  ghi_chu: { type: String },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(DOTTHUCTAP, schema);

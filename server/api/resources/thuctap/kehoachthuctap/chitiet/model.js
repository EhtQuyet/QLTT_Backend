import mongoose, { Schema } from 'mongoose';
import { KEHOACHTT, KEHOACH_CHITIET } from '../../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  id_kehoach: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: KEHOACHTT,
  },
  thoigian_batdau: { type: Date },
  thoigian_ketthuc: { type: Date },
  noidung: { type: String },
  ketqua: { type: String},
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});
schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(KEHOACH_CHITIET, schema);

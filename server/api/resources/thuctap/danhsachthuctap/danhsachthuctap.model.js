import mongoose, { Schema } from 'mongoose';
import { DANHSACHTHUCTAP } from '../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_thuc_tap: { type: String, required: true, validate: /\S+/ },
  namhoc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NamHoc',
    required: true
  },
  ghi_chu: { type: String, required: false, validate: /\S+/},
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(DANHSACHTHUCTAP, schema);

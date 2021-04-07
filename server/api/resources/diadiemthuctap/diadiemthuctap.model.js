import mongoose, { Schema } from 'mongoose';
import { DIADIEMTHUCTAP } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  ten_dia_diem: { type: String, required: true, validate: /\S+/ },
  dia_chi: { type: String, required: true, validate: /\S+/},
  nguoi_dai_dien: { type: String, required: false, validate: /\S+/},
  dien_thoai: { type: String, required: false, validate: /\S+/},
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
  isConfirm: { type: Boolean, default: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(DIADIEMTHUCTAP, schema);

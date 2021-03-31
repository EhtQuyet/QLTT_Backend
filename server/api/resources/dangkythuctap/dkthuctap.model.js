import mongoose, { Schema } from 'mongoose';
import { DANGKYTHUCTAP, DIADIEMTHUCTAP, GIAOVIEN, USER } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  sinh_vien: { type: mongoose.Schema.Types.ObjectId, required: true, ref: USER},
  dia_diem_thuc_tap: {type: mongoose.Schema.Types.ObjectId, required: true, ref: DIADIEMTHUCTAP},
  giao_vien_huong_dan: {type: mongoose.Schema.Types.ObjectId, required: true, ref: GIAOVIEN},
  diem_tbtl: {type: Number, required: true},
  so_tctl: {type: Number, required: true},
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(DANGKYTHUCTAP, schema);

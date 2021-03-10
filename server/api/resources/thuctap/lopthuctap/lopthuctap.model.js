import mongoose, { Schema } from 'mongoose';
import { LOPHOC, LOPTHUCTAP, SINHVIEN } from '../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  lophoc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LOPHOC,
    required: true
  },
  dotthuctap_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LOPHOC,
    required: true
  },
  ghi_chu: { type: String, required: false},
  sinhvien_hoccung_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: SINHVIEN,
    required: true
  },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(LOPTHUCTAP, schema);

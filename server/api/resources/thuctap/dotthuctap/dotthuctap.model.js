import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { NAMHOC, DOTTHUCTAP } from '../../../constant/dbCollections';
import { DTT_TRANG_THAI } from '../../../constant/constant';

const schema = new Schema({
  namhoc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: NAMHOC
  },
  thoigian_batdau: { type: Date },
  thoigian_ketthuc: { type: Date },
  ten_dot: { type: String, required: true, },
  ghi_chu: { type: String },
  trang_thai : {
    type: String,
    enum: Object.values(DTT_TRANG_THAI),
    default: DTT_TRANG_THAI.DANG_MO},
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
export default mongoose.model(DOTTHUCTAP, schema);

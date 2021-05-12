import mongoose, { Schema } from 'mongoose';
import { SINHVIEN, KEHOACHTT } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { KE_HOACH } from '../../constant/constant';

const schema = new Schema({
  ma_sinh_vien: { type: mongoose.Schema.Types.ObjectId, red: SINHVIEN , required: true, validate: /\S+/, unique: true },
  ke_hoach: [{ type: Object}],
  ghi_chu: { type: String},
  trang_thai: {
    type: String,
    enum: Object.values(KE_HOACH),
    default: KE_HOACH.DANG_XU_LY,
  },
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
export default mongoose.model(KEHOACHTT, schema);

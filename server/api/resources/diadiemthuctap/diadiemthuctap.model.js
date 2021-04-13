import mongoose, { Schema } from 'mongoose';
import { DIADIEMTHUCTAP } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DDTT } from '../../constant/constant';

const schema = new Schema({
  ten_dia_diem: { type: String, required: true, validate: /\S+/ },
  dia_chi: { type: String, required: true, validate: /\S+/},
  nguoi_dai_dien: { type: String, required: false, validate: /\S+/},
  dien_thoai: { type: String, required: false, validate: /\S+/},
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
  trang_thai: {
    type: String,
    enum: Object.values(DDTT),
    default: DDTT.DANG_MO},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(DIADIEMTHUCTAP, schema);

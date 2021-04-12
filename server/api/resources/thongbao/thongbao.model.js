import mongoose, { Schema } from 'mongoose';
import { THONGBAO } from '../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { THONG_BAO } from '../../constant/constant';

const schema = new Schema({
  tieu_de: { type: String, required: true },
  noi_dung: { type: String, required: true },
  sinh_vien: { type: String, required: true },
  trang_thai: {
    type: String,
    enum: Object.values(THONG_BAO),
    default: THONG_BAO.DA_GUI,
  },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});


schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(THONGBAO, schema);

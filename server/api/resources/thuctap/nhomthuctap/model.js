import mongoose, { Schema } from 'mongoose';
import {
  DANGKYTHUCTAP,
  DIADIEMTHUCTAP,
  DOTTHUCTAP,
  GIAOVIEN,
  NAMHOC,
  NHOMTHUCTAP,
  SINHVIEN,
} from '../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { TRANG_THAI } from '../../../constant/constant';

const schema = new Schema({
  nam_hoc: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: NAMHOC,
  },
  id_dotthuctap: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: DOTTHUCTAP,
  },
  id_giangvien: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: GIAOVIEN,
  },
  dia_diem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: DIADIEMTHUCTAP,
  },
  id_nhomtruong: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: SINHVIEN,
  },
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});
schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(NHOMTHUCTAP, schema);

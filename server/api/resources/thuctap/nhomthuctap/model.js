import mongoose, { Schema } from 'mongoose';
import { DIADIEMTHUCTAP, DOTTHUCTAP, GIAOVIEN, NHOMTHUCTAP } from '../../../constant/dbCollections';
import mongoosePaginate from 'mongoose-paginate-v2';
import { TRANG_THAI } from '../../../constant/constant';

const schema = new Schema({
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
  isActive: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  versionKey: false,
});
schema.plugin(mongoosePaginate);
export { schema as DocumentSchema };
export default mongoose.model(NHOMTHUCTAP, schema);

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import {  ROLE } from '../../constant/dbCollections';

const { Schema } = mongoose;
const roleSchema = new Schema({
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    permissions: {type: String, required: true},
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

roleSchema.plugin(mongoosePaginate);

export default mongoose.model(ROLE, roleSchema);

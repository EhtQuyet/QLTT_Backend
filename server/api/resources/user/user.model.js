import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';
import {  USER } from '../../constant/dbCollections';
const { Schema } = mongoose;
const userSchema = new Schema({
    full_name: {type: String, required: true},
    email: {type: String},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String},
    phone: {type: String},
    role: {type: String},
    is_deleted: {type: Boolean, default: false, select: false},
    active: {type: Boolean, default: true},
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

userSchema.plugin(mongoosePaginate);


export default mongoose.model(USER, userSchema);

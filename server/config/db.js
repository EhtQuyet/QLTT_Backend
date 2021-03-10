import mongoose from 'mongoose';
import { getConfig } from './config';
import initialiseDatabase from "./seeder";

const config = getConfig(process.env.NODE_ENV);
mongoose.Promise = global.Promise;
export const connect = () => {
  mongoose.connect(config.MONGO_URI, {useNewUrlParser: true}).then( async () => {
    console.log('Kết nối thành công');
     await initialiseDatabase();
  }).catch(err => {
    console.log('Không thể kết nối đến csdl: ' + err);
  });
}

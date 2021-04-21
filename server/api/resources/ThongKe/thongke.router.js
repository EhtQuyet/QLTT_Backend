import express from 'express';
import passport from 'passport';
import * as controller from './thongke.controller';

export const thongkeRouter = express.Router();

thongkeRouter
  .route('/sv-thuc-tap')
  .get(passport.authenticate('jwt', { session: false }), controller.getThongKeSinhVien)
thongkeRouter
  .route('/dia-diem-svtt')
  .get(passport.authenticate('jwt', { session: false }), controller.getThongKeSVTheoDiaDiem)

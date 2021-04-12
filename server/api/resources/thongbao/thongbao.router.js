import express from 'express';
import passport from 'passport';
import * as controller from './thongbao.controller';

export const thongbaoRouter = express.Router();
thongbaoRouter
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.create)

thongbaoRouter
  .route('/:key')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .put(passport.authenticate('jwt', { session: false }), controller.update)


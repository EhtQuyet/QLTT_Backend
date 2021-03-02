import express from 'express';
import passport from 'passport';
import * as controller from './danhsachthuctap.controller';

export const danhsachthuctapRouter = express.Router();
danhsachthuctapRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

danhsachthuctapRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

import express from 'express';
import passport from 'passport';
import * as controller from './diadiemthuctap.controller';

export const diadiemthuctapRouter = express.Router();
diadiemthuctapRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

diadiemthuctapRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

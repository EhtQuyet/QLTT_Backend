import express from 'express';
import passport from 'passport';
import * as controller from './lop.controller';

export const lophocRouter = express.Router();
lophocRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

lophocRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

import express from 'express';
import passport from 'passport';
import * as controller from './dotthuctap.controller';

export const dotthuctapRouter = express.Router();
dotthuctapRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)
dotthuctapRouter
  .route('/dangky')
  .get(passport.authenticate('jwt', { session: false }), controller.getAllDK)
dotthuctapRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

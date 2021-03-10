import express from 'express';
import passport from 'passport';
import * as controller from './lopthuctap.controller';

export const lopthuctapRouter = express.Router();
lopthuctapRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

lopthuctapRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

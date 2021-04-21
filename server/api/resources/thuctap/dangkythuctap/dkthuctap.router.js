import express from 'express';
import passport from 'passport';
import * as controller from './dkthuctap.controller';

export const dkthuctapRouter = express.Router();
dkthuctapRouter.route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

dkthuctapRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findById)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);
dkthuctapRouter
  .route('/sv/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
dkthuctapRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)

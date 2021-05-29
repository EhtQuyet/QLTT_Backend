import express from 'express';
import passport from 'passport';
import * as controller from './nhiemVuSinhvien.controller';

export const nhiemVuRouter = express.Router();
nhiemVuRouter.route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

nhiemVuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findById)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

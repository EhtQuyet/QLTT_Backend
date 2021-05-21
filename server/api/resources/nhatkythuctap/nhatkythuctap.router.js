import express from 'express';
import passport from 'passport';
import * as controller from './nhatkythuctap.controller';

export const nhatkyRouter = express.Router();
nhatkyRouter  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

nhatkyRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

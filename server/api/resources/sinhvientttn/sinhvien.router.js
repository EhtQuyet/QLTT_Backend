import express from 'express';
import passport from 'passport';
import * as controller from './sinhvien.controller';

export const sinhvienRouter = express.Router();
sinhvienRouter  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create)

sinhvienRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

import express from 'express';
import passport from 'passport';
import * as Controller from './controller';

export const router = express.Router();
router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), Controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), Controller.create)

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), Controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), Controller.remove)
  .put(passport.authenticate('jwt', { session: false }), Controller.update);

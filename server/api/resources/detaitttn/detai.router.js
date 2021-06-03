import express from 'express';
import passport from 'passport';
import * as controller from './detai.controller';

export const detaiRouter = express.Router();
detaiRouter.route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getAll)
  .post(passport.authenticate('jwt', { session: false }), controller.create);
detaiRouter.route('/danhgiatrunglap')
  .post(passport.authenticate('jwt', { session: false }), controller.duplication);
detaiRouter.route('/list')
  .get(passport.authenticate('jwt', { session: false }), controller.getListDeTai);
detaiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne)
  .delete(passport.authenticate('jwt', { session: false }), controller.remove)
  .put(passport.authenticate('jwt', { session: false }), controller.update);

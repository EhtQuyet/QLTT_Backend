import express from 'express';
import passport from 'passport';
import userController from './user.controller';
import roleAuthorization from '../../utils/roleAuthorization';
import {ARR_ROLES} from "../../constant/constant";

const userRouter = express.Router();
userRouter.post('/', userController.signup);

userRouter.post('/login', userController.login);
userRouter.get('/me', passport.authenticate('jwt', { session: false }), userController.authenticate);
userRouter.put('/info', passport.authenticate('jwt', { session: false }), userController.updateInfo)
userRouter.put('/reset-password', passport.authenticate('jwt', { session: false }), userController.resetPassword)

userRouter.get('/', passport.authenticate('jwt', { session: false }), roleAuthorization(ARR_ROLES), userController.findAll);

userRouter.put('/change-password', passport.authenticate('jwt', { session: false }), userController.changePassword)
userRouter.post('/forgot-password-mail', userController.forgotPasswordMail)

userRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), userController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), userController.delete)
  .put(passport.authenticate('jwt', { session: false }), userController.update);

export default userRouter;



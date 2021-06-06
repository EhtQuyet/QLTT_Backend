import express from 'express';
import passport from 'passport';
import * as Controller from './file.controller';

import { checkTempFolder, multipartMiddleware } from '../../../utils/fileUtils';

export const fileRouter = express.Router();

fileRouter
  .route('/upload')
  .post(checkTempFolder, multipartMiddleware,Controller.upload)
fileRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), Controller.getAll)

fileRouter
  .route('/:id')
  .get(Controller.downloadFile)

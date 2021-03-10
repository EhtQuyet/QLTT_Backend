import express from 'express';
import passport from 'passport';
import roleCtr from './role.controller';
import {ARR_ROLES} from "../../constant/constant";

const roleRouter = express.Router();

roleRouter.get('/', roleCtr.findAll);

roleRouter
  .route('/:id')
  .get(roleCtr.findOne)
  // .delete(roleCtr.delete)

export default roleRouter;

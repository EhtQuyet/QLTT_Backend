import roleService from './role.service';
import Role from './role.model';
import * as responseAction from '../../utils/responseAction';

import { getConfig } from '../../../config/config';
import queryHelper from '../../helpers/queryHelper';

const config = getConfig(process.env.NODE_ENV);

export default {

  async findAll(req, res) {
    try {
      const role = await Role.find();
      return responseAction.success(res, role);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findById(id)
      if (!role) {
        responseAction.error(res, 404, '')
      }
      return responseAction.success(res, role);
    } catch (err) {
      responseAction.error(res, err);
    }
  },
};

import * as responseAction from '../../../utils/responseAction';
import queryHelper from '../../../helpers/queryHelper';
import * as fileUtils from '../../../utils/fileUtils';
import * as ImageUtils from '../../../utils/ImageUtils';
import Model from './file.model';
import Service from './file.service';
import { getFilePath } from '../../../utils/fileUtils';
import fs from 'fs';
import path from 'path';

export async function upload(req, res) {
  try {
    let value = req.body;
    let filePath = req.files.file.path;
    const file_id = fileUtils.createUniqueFileName(filePath);
    await fileUtils.createByNameFile(filePath, file_id);
    value.file_id = file_id;
    value.file_name = req.files.file.name;
    const data = await Model.create(value);
    return responseAction.success(res, data);
  } catch (err) {
    console.error(err);
    return responseAction.error(res, err, 500);
  }
}

export async function getAll(req, res) {
  try {
    const query = queryHelper.extractQueryParam(req);
    const { criteria, options } = query;
    options.sort = { thu_tu: 1 };
    const data = await Model.paginate(criteria, options);
    responseAction.success(res, data);
  } catch (err) {
    responseAction.error(res, err);
  }
}

export function previewFile(req, res) {
  const file = getFilePath(req.params.id);
  const type = mime[path.extname(file).slice(1)] || 'text/plain';
  const s = fs.createReadStream(file);
  s.on('open', function() {
    res.set('Content-Type', type);
    s.pipe(res);
  });
  s.on('error', function() {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not found');
  });
}


export function downloadFile(req, res) {
  res.download(getFilePath(req.params.id));
}

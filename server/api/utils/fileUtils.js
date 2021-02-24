import fs from 'fs';
import * as AWS from 'ibm-cos-sdk';
import uuidV4 from 'uuid';
import multipart from 'connect-multiparty';
import path from 'path';
import { getConfig } from '../../config/config';
import request from 'request';

const osTempDir = require('os').tmpdir();
const tempDir = osTempDir + '/uploads';

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const config = getConfig(process.env.NODE_ENV);
const multipartMiddleware = multipart({ uploadDir: tempDir });
let conf = config.cos.credentials;
let s3;
let bucketName = config.cos.bucketName;

const checkTempFolder = (req, res, next) => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  next();
};

const prepareTempFolder = () => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  clearFolder(tempDir);
};

const clearFolder = (tempDir) => {
  fs.readdir(tempDir, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    for (const file of files) {
      fs.unlink(path.join(tempDir, file), err => {
        if (err) {
          console.log(file, err);
        }
      });
    }
  });
};

const getFileExtension = (filename) => {
  let ext = /^.+\.([^.]+)$/.exec(filename);
  return ext === null ? '' : ext[1];
};

const checkMainBucket = () => {
  s3 = new AWS.S3(conf);
  const bucketParams = {
    Bucket: bucketName,
  };
  return s3.headBucket(bucketParams).promise();
};
const createItemObject = (fileName, file) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    ACL: 'public-read',
    Body: file,
  };
  return s3.putObject(params).promise();
};

const deleteItemObject = (key) => {
  return s3.deleteObject({
    Bucket: bucketName,
    Key: key,
  }).promise();
};

const create = (filePath) => {
  return new Promise((resolve, reject) => {
    let file = fs.createReadStream(filePath);
    file.on('error', (err) => {
      console.log(err);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('err', err);
          throw err;
        }
      });
      reject(FILE_MISSING);
    });
    checkMainBucket().then(() => {
      let fileExtension = getFileExtension(filePath);
      let fileName = fileExtension === '' ? uuidV4() : uuidV4() + '.' + fileExtension;
      createItemObject(fileName, file).then(() => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
        resolve(fileName);
      }).catch(err => {
        console.log(err);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
        reject(err);
      });
    }).catch(err => {
      console.log('Bucket is not exists or you dont have permission to access it.');
      console.log(err);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('err', err);
          throw err;
        }
      });
      reject(err);
    });
  });
};
const createByName = (filePath, fileName, pathOriginal) => {
  return new Promise((resolve, reject) => {
    let file = fs.createReadStream(filePath);
    file.on('error', (err) => {
      console.log(err);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('err', err);
          throw err;
        }
      });
      if (pathOriginal)
        fs.unlink(pathOriginal, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
      reject('Lỗi');
    });
    checkMainBucket().then(() => {
      createItemObject(fileName, file).then((response) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
        if (pathOriginal)
          fs.unlink(pathOriginal, (err) => {
            if (err) {
              console.log('err', err);
              throw err;
            }
          });
        resolve(fileName);
      }).catch(err => {
        console.log(err);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
        if (pathOriginal)
          fs.unlink(pathOriginal, (err) => {
            if (err) {
              console.log('err', err);
              throw err;
            }
          });
        reject(err);
      });
    }).catch(err => {
      console.log('Bucket is not exists or you dont have permission to access it.');
      console.log(err);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('err', err);
          throw err;
        }
      });
      if (pathOriginal)
        fs.unlink(pathOriginal, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
      reject(err);
    });
  });
};

const update = (filePath, fileName) => {
  return new Promise((resolve, reject) => {
    let file = fs.createReadStream(filePath);
    file.on('error', (err) => {
      console.log(err);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('err', err);
          throw err;
        }
      });
      reject('Lỗi');
    });
    checkMainBucket().then(async () => {
      await deleteItemObject(fileName).then(() => {
        console.log('Delete file: ' + fileName);
      }).catch(err => {
        console.log(err);
      });
      createItemObject(fileName, file).then(() => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
        resolve(fileName);
      }).catch(err => {
        console.log(err);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('err', err);
            throw err;
          }
        });
        reject(err);
      });
    }).catch(err => {
      console.log('Bucket is not exists or you dont have permission to access it.');
      console.log(err);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('err', err);
          throw err;
        }
      });
      reject(err);
    });
  });
};

const remove = (fileName) => {
  return new Promise((resolve, reject) => {
    checkMainBucket().then(() => {
      deleteItemObject(fileName).then(() => {
        resolve(fileName);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    }).catch(err => {
      console.log('Bucket is not exists or you dont have permission to access it.');
      console.log(err);
      reject(err);
    });
  });
};
const getUrlFile = (fileName) => {
  //console.log(conf.endpoint + '/' + bucketName + '/' + fileName, 'conf.endpoint + \'/\' + bucketName + \'/\' + fileName;')
  return conf.endpoint + '/' + bucketName + '/' + fileName;
};

function getFileName(path) {
  let fileName;
  if (path) {
    let fileExtension = getFileExtension(path);
    fileName = fileExtension === '' ? uuidV4() : uuidV4() + '.' + fileExtension;
  }
  return fileName;
}

async function downLoadAndSaveFile(pathUrl, file_name, fileStorage) {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  request(pathUrl).pipe(fs.createWriteStream(tempDir + '/' + file_name)).on('close', async function() {
    await createByName(tempDir + '/' + file_name, fileStorage);
  });
}

function formatFileName(str) {
  if (!str) return;
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/\s+/g, '_');
  return str;
}

function getMaSo(){

}

export {
  create,
  createByName,
  update,
  remove,
  getUrlFile,
  multipartMiddleware,
  getFileExtension,
  prepareTempFolder,
  getFileName,
  checkTempFolder,
  downLoadAndSaveFile,
  formatFileName,
};

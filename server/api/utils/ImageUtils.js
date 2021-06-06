import * as FileUtil from './fileUtils';
import path from 'path';
import { xml2js } from 'xml-js';
import exif from 'exif-reader';
import { getFileExtension } from './fileUtils';

export async function createThumbnail(fileName, filePath) {
  let thumbnailName = getThumbnailName(fileName);
  let thumbnailPath = path.join(FileUtil.tempDir, thumbnailName);

  await sharp(filePath).resize(512, 512, {
    fit: sharp.fit.cover,
    withoutEnlargement: true,
  }).toFile(thumbnailPath);
  return thumbnailPath;
}

function imageOptimizeOptions(sharpInstance, extension) {
  if (extension === 'jpg' || extension === 'jpeg') {
    sharpInstance.jpeg({ mozjpeg: true });
  }

  if (extension === 'png') {
    sharpInstance.png({ quality: 80 });
  }

  return sharpInstance;
}

export async function rotate(rotatedFileName, filePath) {
  let rotatedFilePath = path.join(FileUtil.tempDir, rotatedFileName);
  let sharpExecute = sharp(filePath)
    .withMetadata()
    .rotate();
  sharpExecute = imageOptimizeOptions(sharpExecute, getFileExtension(rotatedFileName).toLowerCase());
  await sharpExecute.toFile(rotatedFilePath);
  return rotatedFilePath;
}

export function getThumbnailName(filePath) {
  let fileName = path.parse(filePath).base;
  return `thumbnail_${fileName}`;
}

export async function metadata(filePath) {
  let metadata = await sharp(filePath).metadata();
  metadata.xmp = await xmp(metadata.xmp);
  metadata.exif = await exifReader(metadata.exif);
  return metadata;
}


async function exifReader(exifBuffer) {
  try {
    return exif(exifBuffer);
  } catch (e) {
    // console.log('err', e);
  }
}

async function xmp(xmpBuffer) {
  try {
    return xml2js(xmpBuffer.toString(), { compact: true, spaces: 2 });
  } catch (e) {
    // console.log('err', e);
  }
}

const sharp = require('sharp');

export async function cropImage(filePath, x, y, w, h, croppedFile) {
  const image = sharp(filePath);
  await image.extract({ left: x, top: y, width: w, height: h }).toFile(croppedFile);
}

export function extractLocationData(metadata) {
  let exif = metadata.exif;
  let xmp = metadata.xmp;
  let locationData = {};
  if (exif && exif.gps) {
    locationData.latitude = exif.gps['GPSLatitude'][0] + exif.gps['GPSLatitude'][1] / 60 + exif.gps['GPSLatitude'][2] / 60 / 60;
    locationData.longitude = exif.gps['GPSLongitude'][0] + exif.gps['GPSLongitude'][1] / 60 + exif.gps['GPSLongitude'][2] / 60 / 60;
  }

  if (exif && exif.exif) {
    locationData.date_time_original = exif['exif']['DateTimeOriginal'];
  }

  let djiMetadata;
  try {
    djiMetadata = xmp['x:xmpmeta']['rdf:RDF']['rdf:Description']['_attributes'];
    locationData.absolute_altitude = djiMetadata['drone-dji:AbsoluteAltitude'] ? parseFloat(djiMetadata['drone-dji:AbsoluteAltitude']) : null;
    locationData.relative_altitude = djiMetadata['drone-dji:RelativeAltitude'] ? parseFloat(djiMetadata['drone-dji:RelativeAltitude']) : null;
    locationData.gimbal_roll_degree = djiMetadata['drone-dji:GimbalRollDegree'] ? parseFloat(djiMetadata['drone-dji:GimbalRollDegree']) : null;
    locationData.gimbal_yaw_degree = djiMetadata['drone-dji:GimbalYawDegree'] ? parseFloat(djiMetadata['drone-dji:GimbalYawDegree']) : null;
    locationData.gimbal_pitch_degree = djiMetadata['drone-dji:GimbalPitchDegree'] ? parseFloat(djiMetadata['drone-dji:GimbalPitchDegree']) : null;
    locationData.flight_roll_degree = djiMetadata['drone-dji:FlightRollDegree'] ? parseFloat(djiMetadata['drone-dji:FlightRollDegree']) : null;
    locationData.flight_yaw_degree = djiMetadata['drone-dji:FlightYawDegree'] ? parseFloat(djiMetadata['drone-dji:FlightYawDegree']) : null;
    locationData.flight_pitch_degree = djiMetadata['drone-dji:FlightPitchDegree'] ? parseFloat(djiMetadata['drone-dji:FlightPitchDegree']) : null;
  } catch (e) {
    // console.log(e);
  }
  return locationData;
}



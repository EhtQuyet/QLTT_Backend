/* eslint consistent-return:0 import/order:0 */
import '@babel/polyfill';
import express from 'express';
import path from 'path';
import passport from 'passport';
import bodyParser from 'body-parser';

import logger from './logger';
import router from './router';

import argv from './argv';
import port from './port';
import setup from './middlewares/frontendMiddleware';
import { connect } from './config/db';
import { configJWTStrategy } from './api/middlewares/passport-jwt';

const isDev = process.env.NODE_ENV !== 'production';
/*const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;*/

connect();

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', router);

app.use(passport.initialize());
configJWTStrategy();

// get the intended host and port number, use localhost and port 8080 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
  // Connect to ngrok in dev mode

  /*if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }*/
});

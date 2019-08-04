import { createRequire } from 'module';
import { fileURLToPath as fromURL } from "url";
var require = createRequire(import.meta.url);
var path = require('path');
var __dirname = path.join(fromURL(import.meta.url), '../');

const express = require('express');
const compress = require('compression');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const { PostgreSQL: { CONNECT } } = require('fxsql');
const DB = CONNECT({
  host: 'localhost',
  user: 'indongyoo',
  password: '',
  database: 'npay',
  max: 20
});
DB.FxSQL_DEBUG.ERROR_WITH_SQL = true;
global.FxSQL_DEBUG = DB.FxSQL_DEBUG;
global.VALUES = DB.VALUES;
global.IN = DB.IN;
global.NOT_IN = DB.NOT_IN;
global.EQ = DB.EQ;
global.SET = DB.SET;
global.COLUMN = DB.COLUMN;
global.CL = DB.CL;
global.TABLE = DB.TABLE;
global.TB = DB.TB;
global.SQL = DB.SQL;
global.SQLS = DB.SQLS;
global.QUERY = DB.QUERY;
global.QUERY1 = DB.QUERY1;
global.ASSOCIATE = DB.ASSOCIATE;
global.ASSOCIATE1 = DB.ASSOCIATE1;
global.ASSOCIATE_MODULE = DB.ASSOCIATE_MODULE;
global.TRANSACTION = DB.TRANSACTION;

global.app = express();

(async () => {
  app.use(compress());
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(require('stylus').middleware(path.resolve(__dirname, './css')));
  app.use(express.static(path.resolve(__dirname, './')));
  app.use(logger('dev'));

  await import('./route/index.js');

  app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(`error!!!!!!!! ${err.status} ${err.message} ${err.stack}`);
  });

  app.listen(3000, _ => console.log('Express server listening on port ' + 3000));
}) ();
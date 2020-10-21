const express = require('express');
const cookieParser = require('cookie-parser');
// TODO what todo with this?
// For: automated logging of requests, responses and related data
const logger = require('morgan');
const config = require('./config');
const log = require('./utils/log');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Static files? then enable at that time and create a public dir for it
// app.use(express.static(path.join(__dirname, 'public')));

// API routes
const indexRouter = require('./routes/index');
const testRouter = require('./routes/test');
const API_PATH = '/api';
app.use(API_PATH + '/', indexRouter);
app.use(API_PATH + '/test', testRouter);

log('Client started on PORT=', config.PORT);

module.exports = app;


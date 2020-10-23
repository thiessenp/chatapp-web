const express = require('express');
// const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// TODO what todo with this?
// For: automated logging of requests, responses and related data
const logger = require('morgan');
const cors = require('cors');

// For: dev debug logging
const log = require('./utils/log');
const config = require('./config');


const app = express();

// (TODO) Done in Nginx. 
// See http://nginx.org/en/docs/http/ngx_http_gzip_module.html
// app.use(compression());

app.use(cors({origin: config.FRONTEND_HOST}));
app.use(logger('dev'));
app.use(express.json());
// url-encoded for multipart form data 
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Static files? then enable at that time and create a public dir for it
// app.use(express.static(path.join(__dirname, 'public')));

// API routes
// TODO add API version to requests 1.0.0
const indexRouter = require('./routes/index');
const healthCheckRouter = require('./routes/healthCheck');
const API_PATH = '/api';
app.use(API_PATH + '/', indexRouter);
app.use(API_PATH + '/healthCheck', healthCheckRouter);


// Default Not found 404 error
app.use(function(req, res, next) {
    res.status(404).json({ message: 'Not Found' });
});

// Default Server 500 error. Catchall at end of the middleware function stack.
// Express default handler also rems stack in prod but eh I like control.
app.use(function(err, req, res, next) {
    // Includes stack trace - potential sensitive
    if (config.NODE_ENV === 'development') {
        res.status(500).json({
            message: err.message,
            error: err,
            stack: err.stack
        });
    } else {
        res.status(500).json({ message: 'AHHHhhh someTHING broke!' });
    }
});


log(`Client started on PORT=${config.PORT}`);

module.exports = app;


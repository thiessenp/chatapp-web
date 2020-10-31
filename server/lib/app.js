const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const config = require('./config');
const log = require('./utils/log');

const app = express();


// (TODO) DO in Nginx.
// See http://nginx.org/en/docs/http/ngx_http_gzip_module.html
// app.use(compression());

app.use(cors({origin: config.FRONTEND_HOST}));

// TODO what todo with this? Verify not send in prod or should it?
// For: automated logging of requests, responses and related data
app.use(logger('dev'));

app.use(express.json());

// Use instead of bodyParser that only handles JSON and UrlEncoded not MultiPart
// Us `x-www-form-encoded`  (-vs- fail `form-data`)
// Body-parser deprecated(?) as of Express v4.16
app.use(bodyParser.urlencoded({extended: true})); // True for bet. JSON UX

app.use(cookieParser());

// API routes
// Static files? then enable at that time and create a public dir for it
// app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./api/index'));

log(`Client started on PORT=${config.PORT}`);


module.exports = app;


const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const config = require('./config');
const {connect: connectDB} = require('./drivers/postgreSQL');
// require('debug'); -- silent? so wrote my own
const log = require('./utils/log');
const {errorHandler} = require('./middleware/errorHandler');
const {NotFound, NotAuthorized} = require('./utils/errors');

const app = express();

// Connect DB check, not required, just making sure.
connectDB();

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

// API ROUTES
//
// Static files? then enable at that time and create a public dir for it
// app.use(express.static(path.join(__dirname, 'public')));
//
app.use('/api/', require('./api/index'));
app.use('/api/health', require('./api/health'));
app.use('/api/accounts', require('./api/accounts'));
app.use('/api/chats', require('./api/chats'));

// TODO: figure out how the below works? e.g. why diff sig. change behavor?!
//
// IMPORTANT: keep Method Signature as is, e.g. add `err` and will fail
// Because: no err because not middleweare
app.all('*', (req, res, next) => {
  // Handles 404 errors
  errorHandler(new NotFound('Route not found'), req, res, next);
});
// IMPORTANT: keep Method Signature as is, e.g. rem `next` and will fail
// Because must be middleware .use, since not know route, so need err
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Handles 401 errors
    errorHandler(new NotAuthorized('Invalid token.'), req, res, next);
  } else {
    // Handles other defined errors and catch all as 500 error
    errorHandler(err, req, res);
  }
});

log(`Client started on PORT=${config.PORT}`);


module.exports = app;

const config = require('../config');
const log = require('../utils/log');
const {GeneralError} = require('../utils/errors');


/**
 * Handles formating error and creating a response
 * Note: be careful of cases where headers have already started sending(?)
 * @param {*} err error object
 * @param {*} req req object
 * @param {*} res res object
 * @return {Object} response object formatted
 */
function errorHandler(err, req, res) {
  const errObj = {
    status: 'error',
    message: err.message,
  };

  // Add extra info for debugging but keep any potential secrets from prod
  if (config.NODE_ENV === 'development') {
    errObj.stack = err.stack;
  }

  // Debugging info
  log('Error', errObj);

  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json(errObj);
  }

  return res.status(500).json(errObj);
}

/**
 * Allows catching errors in an async function

 * e.g. in Router
 * router.get('/', catchAsyncError(async function(req, res, next) {
 *   if (somethingBad) {
 *     return next(new GeneralError('This is bad.'));
 *   }
 *   ...
 * }));
 *
 * e.g. in Service
 * async function someService(name) {
 *    if (!name) {
 *      throw new BadRequest('Name param must be sent.');
 *    }
 *    ...
 * }
 *
 *
 * NOTE equivalent pattern - without catchAsyncError:
 * router.get('/', async function(req, res, next) {
 *   try {
 *      if (somethingBad) {
 *        throw new BadRequest('Name param must be sent.');
 *      }
 *      ...
 *    } catch(e) {
 *      next(e);
 *    }
 * });
 *
 * @param {Function} fn callback with async function
 * @return {Function} closure to call on an error
 */
const catchAsyncError = (fn) => {
  return (req, res, next) => {
    // Edge case of route not found, callback passed is not a promise oddly?
    try {
      fn(req, res, next).catch(next);
    } catch (e) {
      // Interested in error on stack, not above missing catch error, so leave as is
      next();
    }
  };
};


module.exports = {
  errorHandler,
  catchAsyncError,
};

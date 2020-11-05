/**
 * Abstracted Error class for use with response errors
 */
class GeneralError extends Error {
  /**
     *
     * @param {Object} message could also be a string, message for error
     */
  constructor(message) {
    super();
    this.message = message;
  }

  /**
   * Gets the HTTP status code based on instance of this class
   * @return {Number} status code number
   */
  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotAuthorized) {
      return 401;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

/**
 * 400 error
 */
class BadRequest extends GeneralError {}

/**
 * 401 error
 */
class NotAuthorized extends GeneralError {}

/**
 * 404 error
 */
class NotFound extends GeneralError {}


module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  NotAuthorized,
};

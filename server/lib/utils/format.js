
/**
 * Formats an error object for responses
 * @param {Number} code - status code for HTTP probably
 * @param {*} messageData can be anything
 * @return {Object} formatted error object
 */
function errorData(code, messageData) {
  return {
    code: code || 500,
    message: messageData || {},
  };
}

/**
 * Formats the data for a router response
 * @param {Object} o - params
 * @param {Object} [o.error] - (optional) error object or string
 * @param {Object} [o.data] - (optional) response data
 * @return {Object} formatted response data object
 */
function response(o={}) {
  return {
    error: o.error || null,
    data: o.data || {},
  };
}


module.exports = {
  errorData,
  response,
};

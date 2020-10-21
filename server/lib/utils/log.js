/**
 * Just wanted a simple dev logger, so wrote a very simple one.
 */

const config = require('../config');
const logPrefix = '--';

module.exports = function log(...args) {
  if (config.NODE_ENV === 'development' && args && args.length > 0) {
    console.log(
        logPrefix,
        // Legacy old way... Array.prototype.slice.call(arguments, 0).join('')
        args.join(''),
    );
  }
};

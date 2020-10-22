/**
 * Just wanted a simple dev logger, so wrote a very simple one.
 */

const config = require('../config');
const logPrefix = '--';

module.exports = function log(messageOrData, data) {
  if (config.NODE_ENV === 'development' && messageOrData) {
    if (messageOrData && data) {
      console.log(logPrefix, messageOrData, data);
    } else {
      console.log(logPrefix, messageOrData);
    }

    // if (Array.isArray(args)) {
    //   console.log(0, args)
    //   console.log(
    //     logPrefix,
    //     // Legacy old way... Array.prototype.slice.call(arguments, 0).join('')
    //     args.join('')
    //   );
    // } else if (typeof args === 'object') {
    //   console.log(1)
    //   console.dir(args);
    // } else {
    //   console.log(args);
    // }
  }
};

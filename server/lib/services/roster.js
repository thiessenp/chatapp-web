const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');


/**
   * Get chat roster data from chat with id
   * @param {UUID} id - chat id
   * @return {Object} roster user list data
   */
async function getRoster(id) {
  const result = await dbClient.getRoster(id)
      .then((data) => data)
      .catch((error) => {
        log('getRoster query failed:', error);
        return {error: error};
      });

  return result;
}


module.exports = {
  getRoster,
};

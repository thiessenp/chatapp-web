const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');


/**
   * Get chat transcript data from chat with id
   * @param {UUID} id - chat id
   * @return {Object} transcript list data
   */
async function getTranscript(id) {
  const result = await dbClient.getTranscript(id)
      .then((data) => data)
      .catch((error) => {
        log('getTranscript query failed:', error);
        return {error: error};
      });

  return result;
}


module.exports = {
  getTranscript,
};

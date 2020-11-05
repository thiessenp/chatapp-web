const dbClient = require('../drivers/postgreSQL');
const {BadRequest} = require('../utils/errors');


/**
   * Get chat transcript data from chat with id
   * @param {UUID} id - chat id
   * @return {Object} transcript list data
   */
async function getTranscript(id) {
  if (!id) {
    throw new BadRequest('getTranscript id must be valid');
  }

  const result = await dbClient.getTranscript(id)
      .then((data) => data)
      .catch((e) => {
        throw e;
      });

  if (result.rows === undefined) {
    throw new BadRequest('getTranscript result Rows was oddly undefined.');
  }

  // Transcript is empty until it has messges, so set a default if none
  return {data: result.rowCount > 0 ? result.rows : []};
}


module.exports = {
  getTranscript,
};

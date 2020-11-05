const dbClient = require('../drivers/postgreSQL');
const {BadRequest} = require('../utils/errors');


/**
   * Get chat roster data from chat with id
   * @param {UUID} id - chat id
   * @return {Object} roster user list data
   */
async function getRoster(id) {
  if (!id) {
    throw new BadRequest('getRoster id must be valid');
  }

  const result = await dbClient.getRoster(id)
      .then((data) => data)
      .catch((e) => {
        throw e;
      });

  if (result.rows === undefined) {
    throw new BadRequest('getRoster result Rows was oddly undefined.');
  }

  // Roster is empty until it has users, so set a default if none
  return {data: result.rowCount > 0 ? result.rows : []};
}


module.exports = {
  getRoster,
};

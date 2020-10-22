const { response } = require('../app');
/**
 * Handles Data gathering for the resource
 */

const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');

async function getHealthCheck() {
    const result = await dbClient.healthCheck()
        .then(data => { 
            log('getHealthCheck query success:', data);
            return { data: data };
        })
        .catch(error => { 
            log('getHealthCheck query failed:', error);
            return { error: error };
        });

    return result;
}

module.exports = {
    getHealthCheck
};

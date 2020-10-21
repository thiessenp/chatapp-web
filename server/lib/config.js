/**
 * Loads .env vars
 *
 * Note: Instead of a config file, could also add as a requirement in run e.g.:
 * `"mycommand": "<MY_COMMAND> -r dotenv/config ./index.js",`
 */
const dotenv = require('dotenv');
const result = dotenv.config();


if (result.error) {
  throw result.error;
}

const {parsed: envs} = result;

module.exports = envs;

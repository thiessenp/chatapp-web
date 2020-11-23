/**
 * SQL Engine used to query a generic DB. The Strategy Pattern is used to choose
 * the DB driver at run time.
 *
 * Each DB driver must follow this Interface:
 * - connect() returns the current DB driver connected
 * - query(queryString) returns a query result
 * - queryPromise(queryString) returns a query result as a Promise (more control)
 */

const defaultSQLDriver = require('./postgreSQL');

/**
 * SQL Engine used to query a generic DB.
 */
class SqlEngine {
  // _driver  -- ESLint gives an error, hmmm

  /**
   * Initializes by setting the strategy (driver) passed or defaults to postgres
   * @param {Object} driver SQL driver
   */
  constructor(driver=defaultSQLDriver) {
    this.setDriver(driver);
  }

  /**
   * Gets the currently loaded driver
   * @return {Object} SQL driver loaded
   */
  async getDriver() {
    return this._driver;
  }

  /**
   * Updates the currently loaded SQL driver to this one for future queries etc
   * @param {Object} driver SQL driver to load
   */
  async setDriver(driver) {
    this._driver = driver;
  }

  /**
   * Runs the connect logic on the loaded SQL driver. Leaving async as a hint
   * @return {Object} client for currently loaded driver or errors if fails
   */
  async connect() {
    return this._driver.connect();
  }

  /**
   * Runs a query against the loaded SQL driver and returns it as a Promise.
   *
   * Note: no error handling, left for user to handle.
   *
   * @param {String} queryString to run on the SQL driver
   * @return {Object} query result as a promise
   */
  async queryPromise(queryString) {
    return this._driver.queryPromise(queryString);
  }

  /**
   * Runs a query against the loaded SQL driver and returns the result. Driver
   * should do generic error handling by throwing exceptions etc.
   *
   * @param {String} queryString to run on the SQL driver
   * @return {Object} query result as data
   */
  async query(queryString) {
    return this._driver.query(queryString);
  }
}

const sqlEngine = new SqlEngine();

module.exports = {sqlEngine};

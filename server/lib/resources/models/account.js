/**
 * Account holds user info (not chat specific info)
 *
 * @param {object} params
 * @param {UUID} [params.id] - (Optional) userid generated on server
 * @param {String} [params.username] - account username max 50 char (unique?)
 * @param {String} [params.password] - account password for loging in
 */
function Account(params={}) {
  // Not sure of value validating here
  //   if (!params.username || !params.password) {
  //       throw Error('Account requires a username');
  //   }

  this.id = params.id;
  this.username = params.username;
  this.password = params.password;
  // this.is_authenticated = params.is_authenticated -- not sure will be used
}

module.exports = Account;

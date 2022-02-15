const createJWT = require('./createJWT.helpers');
const validateInDB = require('./validateInDB.helpers');
const catchServerError = require('./catchServerError.helpers');
const encryptPass = require('./encryptPass.helpers');

module.exports = {
    ...createJWT,
    ...validateInDB,
    ...catchServerError,
    ...encryptPass
}
const createJWT = require('./createJWT.helpers');
const validateInDB = require('./validateInDB.helpers');
const catchServerError = require('./catchServerError.helpers');
const encryptPass = require('./encryptPass.helpers');
const regexUpperGlobal = require('./regexUpperGlobal.helpers');
const resBookControllers = require('./resBookControllers.helpers');

module.exports = {
    ...createJWT,
    ...validateInDB,
    ...catchServerError,
    ...encryptPass,
    ...regexUpperGlobal,
    ...resBookControllers
}
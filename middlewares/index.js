const { validateErrors } = require('./validateErrors.middlewares');
const { validateJWT } = require('./validateJWT.middlewares');

module.exports = {
    validateErrors,
    validateJWT
}
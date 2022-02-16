const controllerBooks = require('./books.controllers.js');
const controllerUsers = require('./users.controllers');
const controllerCategories = require('./categories.controllers');
const controllerNotFound = require('./notFound.controllers');

module.exports = {
    ...controllerBooks,
    ...controllerUsers,
    ...controllerCategories,
    ...controllerNotFound
}
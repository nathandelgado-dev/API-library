const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    avalibleBooks,
    avalibleBook,
    queriesOfBooks,
    borrowBook,
    returnBook
} = require('../controllers');
const { isExistBookId } = require('../helpers');
const { validateErrors, validateJWT } = require('../middlewares');

router.post('/borrow/:id', [
    validateJWT,
    check('id', 'The value is required').not().isEmpty(),
    check('id', 'The value is not id Valid').isMongoId(),
    check('id').custom(isExistBookId),
    validateErrors
], borrowBook);

router.delete('/borrow/:id', [
    validateJWT,
    check('id', 'The value is required').not().isEmpty(),
    check('id', 'The value is not id Valid').isMongoId(),
    check('id').custom(isExistBookId),
    validateErrors
], returnBook);

router.get('/avalible', [
    validateJWT,
    validateErrors
], avalibleBooks);

router.get('/avalible/:id', [
    validateJWT,
    check('id', 'The id is not valid').if(check('id').exists().isMongoId()),
    check('id').if(check('id').exists().custom(isExistBookId)),
    validateErrors
], avalibleBook);

router.get('/query', [
    validateJWT,
    check('name').if(check('name').exists().isString()),
    check('author').if(check('author').exists().isString()),
    check('category').if(check('category').exists().isString()),
    validateErrors
], queriesOfBooks);

router.get('/', [
    validateJWT,
    validateErrors
], getAllBooks);

router.get('/:id', [
    validateJWT,
    check('id', 'The value is required').not().isEmpty(),
    check('id', 'The value is not id Valid').isMongoId(),
    check('id').custom(isExistBookId),
    validateErrors
], getBook);

router.post('/', [
    validateJWT,
    check('name', 'The value is required').not().isEmpty(),
    check('author', 'The value is required').not().isEmpty(),
    check('name', 'The value not is string').isString(),
    check('author', 'The value not is string').isString(),
    validateErrors
], createBook);

router.put('/:id', [
    validateJWT,
    check('id', 'The value is required').not().isEmpty(),
    check('id', 'The value is not id Valid').isMongoId(),
    check('name', 'The value is string required').if(check('name').exists()).isString(),
    check('author', 'The value is string required').if(check('author').exists()).isString(),
    check('category', 'The value is not id valid').if(check('category').exists()).isMongoId(),
    check('id').custom(isExistBookId),
    validateErrors
], updateBook);

router.delete('/:id', [
    validateJWT,
    check('id', 'The value is required').not().isEmpty(),
    check('id', 'The value is not id Valid').isMongoId(),
    check('id').custom(isExistBookId),
    validateErrors
], deleteBook);

module.exports = router;
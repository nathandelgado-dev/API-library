const { Router } = require('express');
const { check } = require('express-validator');
const { isExistCategory, notExistCategory } = require('../helpers');
const { validateJWT, validateErrors } = require('../middlewares');
const {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers');
const router = Router();

router.get('/', [
    validateJWT,
    validateErrors
], getAllCategories);

router.get('/:id', [
    validateJWT,
    check('id', 'The value is not id valid').isMongoId(),
    check('id').custom(notExistCategory),
    validateErrors
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'The value is required').not().isEmpty(),
    check('name', 'The value is string required').isString(),
    check('id').custom(isExistCategory),
    validateErrors
], createCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'The value is required').not().isEmail(),
    check('name', 'The value is string required').isString(),
    check('id').custom(notExistCategory),
    validateErrors
], updateCategory);

router.delete('/:id', [
    validateJWT,
    check('id', 'The value is not id valid').isMongoId(),
    check('id').custom(notExistCategory),
    validateErrors
], deleteCategory);

module.exports = router;
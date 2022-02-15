const { Router } = require('express');
const {check} = require('express-validator');
const {
    isExistEmail,
    notExistUser
} = require('../helpers');
const {
    validateErrors,
    validateJWT
} = require('../middlewares');
const {
    getAllUsers,
    getUser,
    userSignup,
    userSignin,
    updateUser,
    deleteUser
} = require('../controllers/users.controllers');
const router = Router();

router.get('/', [
    validateJWT,
    validateErrors
], getAllUsers);

router.get('/:id', [
    check('id', 'id user invalid').isMongoId(),
    validateJWT,
    validateErrors
], getUser);

router.post('/signup', [
    check('email', 'The value is required').not().isEmpty(),
    check('pass', 'The value is required').not().isEmpty(),
    check('pass', 'The value require min 8 caracters').isLength({ min: 8 }),
    check('email', 'The value of email is invalid').isEmail(),
    check('email').custom(isExistEmail),
    validateErrors
], userSignup);

router.post('/signin', [
    check('email', 'The email is requiered').not().isEmpty(),
    check('pass', 'The password is required').not().isEmpty(),
    check('pass', 'The value require min 8 caracters').isLength({ min: 8 }),
    check('email', 'The value of email is invalid').isEmail(),
    validateErrors
], userSignin);

router.put('/:id', [
    validateJWT,
    check('emil', 'Not valid email').if(check('weight').exists()).isEmail(),
    check('pass', 'The value require min 8 caracters').if(check('weight').exists()).isLength({ min: 8 }),
    check('borrowedBooks', 'Not valid id').if(check('borrowedBooks').exists()).isMongoId(),
    validateErrors
], updateUser);

router.delete('/:id', [
    validateJWT,
    check('id').custom(notExistUser),
    validateErrors
], deleteUser);

module.exports = router;
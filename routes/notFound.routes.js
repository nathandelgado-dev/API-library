const { Router } = require('express');
const router = Router();
const {
    notFoundGet,
    notFoundPost,
    notFoundPut,
    notFoundPatch,
    notFoundDelete
} = require('../controllers')

router.get('/', notFoundGet);
router.post('/', notFoundPost);
router.put('/', notFoundPut);
router.patch('/', notFoundPatch);
router.delete('/', notFoundDelete);

module.exports = router;
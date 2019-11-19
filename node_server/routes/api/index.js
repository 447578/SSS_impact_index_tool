const router = require('express').Router();

router.use('/cities', require('./cities'));
router.use('/items', require('./items'))
module.exports = router;
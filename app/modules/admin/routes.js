var router = require('express').Router();

var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.noAuthed);
router.use('/users', require('./users/routes'));
router.use('/categories', require('./categories/routes'));

exports.admin = router;

var express = require('express');

var router = express.Router();
// var post = express.Router();

/**
 * Import the authentication middleware to check for the user object
 * in the session.
 */
var authMiddleware = require('../auth/middlewares/auth');

/**
 * Use the middleware to check all routes registered for this router.
 */
router.use(authMiddleware.hasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

router.get('/', (req, res) => {
    var db = require('../../lib/database')();
    db.query('SELECT * FROM post', (err, results, fields) => {
        return res.render('home/views/index', { posts: results });
    });
});

// exports.post = post;
exports.index = router;
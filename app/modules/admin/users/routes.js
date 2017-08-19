var router = require('express').Router();
var db = require('../../../lib/database')();

router.get('/', (req, res) => {
    db.query('SELECT * FROM user', (err, results, fields) => {
        return res.render('admin/users/views/index', { user: results });
    });
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`user\` (\`user_name\`, \`user_birthdate\`, \`user_email\`, \`user_password\`)
    VALUES("${req.body.user_name}","${req.body.user_birthdate}", "${req.body.user_email}", "${req.body.user_password}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/users');
    });
});

router.get('/new', (req, res) => {
    res.render('admin/users/views/form');
});

router.get('/:user_id', (req, res) => {
    db.query(`SELECT * FROM user WHERE user_id=${req.params.user_id}`, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/users/views/form', { user: results[0] });
    });
});

router.put('/:user_id', (req, res) => {
    const queryString = `UPDATE user SET
    user_name = "${req.body.user_name}",
    user_birthdate = "${req.body.user_birthdate}",
    user_email = "${req.body.user_email}"
    WHERE user_id=${req.params.user_id}`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/users');
    });
});

router.get('/:user_id/remove', (req, res) => {
    db.query(`DELETE FROM user WHERE user_id =${req.params.user_id}`, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/users');
    });
});


// -------------------CATEGORIES---------------------------------------

router.get('/categories', (req, res) => {
    db.query('SELECT * FROM category', (err, results, fields) => {
        return res.render('admin/users/views/categories', { category: results });
    });
});

// router.post('/', (req, res) => {
//     var queryString = `INSERT INTO \`user\` (\`user_name\`, \`user_birthdate\`, \`user_email\`, \`user_password\`)
//     VALUES("${req.body.user_name}","${req.body.user_birthdate}", "${req.body.user_email}", "${req.body.user_password}");`;

//     db.query(queryString, (err, results, fields) => {
//         if (err) throw err;
//         return res.redirect('/admin/users');
//     });
// });

// router.get('/new', (req, res) => {
//     res.render('admin/users/views/form');
// });

// router.get('/:user_id', (req, res) => {
//     db.query(`SELECT * FROM user WHERE user_id=${req.params.user_id}`, (err, results, fields) => {
//         if (err) throw err;
//         res.render('admin/users/views/form', { user: results[0] });
//     });
// });

// router.put('/:user_id', (req, res) => {
//     const queryString = `UPDATE user SET
//     user_name = "${req.body.user_name}",
//     user_birthdate = "${req.body.user_birthdate}",
//     user_email = "${req.body.user_email}"
//     WHERE user_id=${req.params.user_id}`;

//     db.query(queryString, (err, results, fields) => {
//         if (err) throw err;
//         res.redirect('/admin/users');
//     });
// });

// router.get('/:user_id/remove', (req, res) => {
//     db.query(`DELETE FROM user WHERE user_id =${req.params.user_id}`, (err, results, fields) => {
//         if (err) throw err;
//         res.redirect('/admin/users');
//     });
// });


module.exports = router;
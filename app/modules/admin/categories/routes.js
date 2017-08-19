var router = require('express').Router();
var db = require('../../../lib/database')();

router.get('/', (req, res) => {
    db.query('SELECT * FROM category', (err, results, fields) => {
        return res.render('admin/categories/views/categories', { category: results });
    });
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`category\` (\`category_name\`)
    VALUES("${req.body.category_name}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/categories');
    });
});

router.get('/new', (req, res) => {
    res.render('admin/categories/views/addcat');
});

router.get('/:category_id', (req, res) => {
    db.query(`SELECT * FROM category WHERE category_id=${req.params.category_id}`, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/categories/views/addcat', { category: results[0] });
    });
});

router.put('/:category_id', (req, res) => {
    const queryString = `UPDATE category SET
    category_name = "${req.body.category_name}"
    WHERE category_id=${req.params.category_id}`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/categories');
    });
});

router.get('/:category_id/remove', (req, res) => {
    db.query(`DELETE FROM category WHERE category_id =${req.params.category_id}`, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/categories');
    });
});





module.exports = router;
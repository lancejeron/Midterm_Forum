var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var signupRouter = express.Router();
var postRouter = express.Router();
var authMiddleware = require('./middlewares/auth');

signupRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/signup', req.query);
    })
    .post((req, res) => {
    var db = require('../../lib/database')();
    db.query(`INSERT INTO \`user\` (\`user_name\`, \`user_email\`, \`user_birthdate\`, \`user_password\`)  VALUES ("${req.body.user_name}", "${req.body.user_email}", "${req.body.user_birthday}", "${req.body.user_password}" )`, (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/login');
    });
});



loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();
        db.query('SELECT * FROM user',(err,results,fields) => {
            for(x=0;x<results.length;x++){
                if(results[x].user_email == req.body.email){
                   if(results[x].user_password == req.body.password)
                    res.render('home/views/index')
                else{
                    res.redirect('/login?incorrect');
                    }
               return;
             }
         }
                    res.redirect('/login?incorrect');
     })
});
postRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/post', req.query);
        })
    .post((req, res) => {
    var db = require('../../lib/database')();
    db.query(`INSERT INTO \`post\` (\`user_id\`, \`category_id\`, \`post_title\`, \`post_content\`, \`post_date\`)  VALUES (${req.body.user_id}, ${req.body.category_id}, "${req.body.post_title}", "${req.body.post_content}", "${req.body.post_date}" )`, (err, results, fields) => {
        if (err) console.log(err);
        console.log("nakapagpost na");
        res.render('home/views/index');
        }); 
    });



logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});






exports.signup = signupRouter
exports.login = loginRouter;
exports.logout = logoutRouter;
exports.post = postRouter;

        // var db = require('../../lib/database')();
        // db.query(`SELECT * FROM user WHERE user_email="${req.body.email}"`, (err, results, fields) => {
        //     if (err) throw err;
        //     if (results.length === 0) return res.redirect('/login?incorrect');

        //     var user = results[0];

        //     if (user.password !== req.body.password) return res.redirect('/login?incorrect');

        //     delete user.password;

        //     req.session.user = user;

        //     return res.redirect('/');
            
        //     // if(user.password === req.body.password) return res.render('home/views/index');
            

        // });
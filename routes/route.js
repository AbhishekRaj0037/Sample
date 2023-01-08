const express = require('express');
const router = express.Router();
const registerService = require('../services/register.service.ts');
const passport = require('passport');

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Welcome ${req.user.username}, You are authenticated!!</h1>\
            <p>Click here to <a href="/logout">Logout</a></p>
        `)
    }
    else {
        res.send('<h1>You are not authenticated!!</h1>\
        <p>Please\
        <a href="/register">Register</a>\
        or\
        <a href="/login">Login</a></p>'
        );
    }
});

router.get('/logout', (req, res) => {
    console.log('You are logged out');
    req.logOut((err) => {
        if (err) return next(err);
        res.redirect('/')
    })
});

router.get('/register', (req, res) => {
    const form = '<h1>Register Page</h1><form method="post" action="/register">\
        Enter Username:<br><input type="text" name="username" required>\
        <br>Enter Password:<br><input type="password" name="password" required>\
        <br><br><input type="submit" value="Submit"></form>\
        If already registered,please <a href="/login">Login</a></p>';
    res.send(form);
});

router.post('/register', registerService);

router.get('/login', (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username" required>\
    <br>Enter Password:<br><input type="password" name="password" required>\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
}, (req, res, next) => {
    console.log('Just testing...')
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure' }), (req, res) => {
    res.redirect('/');
});

router.get('/login-failure', (req, res) => {
    console.log('Login-failed');
    res.send(`<p>You entered the wrong password.<br>\
    <a href="/login">login</a><br>\
    <a href="/register">register</p>`);
});

module.exports = router;

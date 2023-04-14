const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/events', (req, res) => {
    res.render('events');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/members', (req, res) => {
    res.render('members');
});

router.get('/gallery', (req, res) => {
    res.render('gallery');
});

// router.get('/index-login', (req, res) => {
//     res.render('index-login');
// });

// router.get('/about-login', (req, res) => {
//     res.render('members-login');
// });

// router.get('/events-login', (req, res) => {
//     res.render('members-login');
// });

// router.get('/gallery-login', (req, res) => {
//     res.render('members-login');
// });

// router.get('/members-login', (req, res) => {
//     res.render('members-login');
// });

router.get('/index-login', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('index-login');
    }
    else {
        res.redirect('/');
    }
});

router.get('/members-login', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('members-login');
    }
    else {
        res.redirect('/');
    }
});

router.get('/gallery-login', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('gallery-login');
    }
    else {
        res.redirect('/');
    }
});

router.get('/events-login', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('events-login');
    }
    else {
        res.redirect('/');
    }
});

router.get('/about-login', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('about-login');
    }
    else {
        res.redirect('/');
    }
});

router.get('/a2008', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('a2008');
    }
    else {
        res.redirect('/');
    }
});

router.get('/a2009', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('a2009');
    }
    else {
        res.redirect('/');
    }
});

router.get('/a2010', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('a2010');
    }
    else {
        res.redirect('/');
    }
});

router.get('/a2011', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('a2011');
    }
    else {
        res.redirect('/');
    }
});

router.get('/a2012', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('a2012');
    }
    else {
        res.redirect('/');
    }
});

router.get('/a2013', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('a2013');
    }
    else {
        res.redirect('/');
    }
});

router.get('/a2014', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('a2014');
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/auth/login-page', (req, res) => {
    res.render('login');
});

router.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login-page',
    failureFlash: true,
}));

router.get('/auth/login-page', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error al cerrar sesión', err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

module.exports = router;

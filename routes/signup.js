const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('register');
});

router.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.render('signup', { error: 'Las contraseñas no coinciden' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.render('signup', { error: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        req.login(newUser, (err) => {
            if (err) {
                console.error('Error al iniciar sesión después del registro', err);
                return res.render('signup', { error: 'Error interno del servidor' });
            }
            return res.redirect('/profile');
        });
    } catch (error) {
        console.error('Error en el registro', error);
        res.status(500).render('signup', { error: 'Error interno del servidor' });
    }
});

module.exports = router;

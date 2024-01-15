const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/auth/register-page', (req, res) => {
    res.render('register');
});

router.post('/auth/register-page', async (req, res) => {
    const { email, nickname, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.render('register', { error: 'El nombre de usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                username: nickname,
                password: hashedPassword,
            },
        });

        req.login(newUser, (err) => {
            if (err) {
                return res.render('register', { error: 'Error al iniciar sesión después del registro' });
            }
            return res.redirect('/auth/login-page');
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).render('register', { error: 'Error interno del servidor' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/profile/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                posts: true,
            },
        });

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.render('profile', {
            title: `${user.nickname} - Perfil`,
            nickname: user.nickname,
            createdAt: user.createdAt,
            lastConnection: user.lastConnection,
            posts: user.posts,
        });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
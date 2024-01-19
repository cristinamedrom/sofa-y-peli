const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                post: true,
            },
        });

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.render('profile', {
            title: `${user.nickname} - Perfil`,
            nickname: user.nickname,
            createdAt: user.createdAt,
            lastConnection: user.updatedAt,
            post: user.post,
        });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
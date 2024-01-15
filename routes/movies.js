const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({ where: { isPublished: true } });
        res.render('movies', { movies, user: req.user || {} });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/add', isAuthenticated, (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Acceso denegado');
    }
    res.render('addMovie');
});

router.post('/add', isAuthenticated, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Acceso denegado');
    }
    try {
        const { title, synopsis, genre } = req.body;
        const newMovie = await prisma.movie.create({
            data: {
                titleMov: title,
                sypnosis: synopsis,
                genre,
                isPublished: true,
            },
        });
        res.redirect('/movies');
    } catch (error) {
        console.error('Error al añadir película:', error);
        res.status(500).send('Error interno del servidor');
    }
});



module.exports = router;

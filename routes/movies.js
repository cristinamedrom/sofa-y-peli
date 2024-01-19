const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');


router.get('/', async (req, res) => {
    try {
        const { score, genre } = req.query;

        const where = { isPublished: true };
        if (score) {
            where.averageScore = parseFloat(score);
        }
        if (genre) {
            where.genre = genre;
        }

        const movies = await prisma.movie.findMany({ where });

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
        let coverUrl;
        if (req.file) {
            const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
            coverUrl = cloudinaryResult.secure_url;
        }
        const newMovie = await prisma.movie.create({
            data: {
                titleMov: title,
                sypnosis: synopsis,
                genre,
                isPublished: true,
                coverUrl
            },
        });
        res.redirect('/movies');
    } catch (error) {
        console.error('Error al añadir película:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;

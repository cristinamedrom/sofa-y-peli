const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

router.get('/', async (req, res) => {
    try {
        const { score, genre } = req.query;

        const movies = await prisma.movie.findMany({
            where: {
                averageScore: score ? parseFloat(score) : undefined,
                genre: genre || undefined,
            },
        });

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

const upload = multer({ dest: 'uploads/' });

const movieModel = {
    createMovie: async (movieData) => {
        try {
            const newMovie = await prisma.movie.create({
                data: movieData,
            });
            return newMovie;
        } catch (error) {
            throw error;
        }
    },
    getMovieByTitle: async (title) => {
        return prisma.movie.findUnique({
            where: {
                titleMov: title,
            },
        });
    },
};

const fs = require('fs');

router.post('/add', isAuthenticated, upload.single('image'), async (req, res) => {
    const { isAdmin } = req.user;

    if (!isAdmin) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }

    try {
        const { titleMov, sypnosis, genre, averageScore } = req.body;

        // Verificar si el título de la película ya existe
        const existingMovie = await prisma.movie.findUnique({
            where: {
                titleMov,
            },
        });

        if (existingMovie) {
            return res.status(400).json({ error: 'La película ya está registrada' });
        }

        // Crear la película sin la URL de la imagen
        const newMovie = await prisma.movie.create({
            data: {
                titleMov,
                sypnosis,
                genre,
                averageScore,
                // No incluir coverUrl aquí, ya que no estamos subiendo la imagen en este momento
            },
        });

        res.redirect('/movies');

    } catch (error) {
        console.error('Error al crear la película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;

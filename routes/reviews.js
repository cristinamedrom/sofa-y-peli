// reviews.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reviews = await prisma.post.findMany({
            include: { author: true, movie: true },
        });

        res.render('allReviews', { reviews });
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        res.status(500).send('Error interno del servidor');
    }
});


router.get('/:movieId', async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return res.status(404).send('Película no encontrada');
        }

        const reviews = await prisma.post.findMany({
            where: { movieId },
            include: { author: true },
        });

        res.render('movieReviews', { movie, reviews });
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/:movieId/add', isAuthenticated, async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).send('Acceso no autorizado. Inicia sesión para agregar reseñas.');
        }

        const movie = await prisma.movie.findUnique({
            where: { titleMov: req.params.movieId },
        });

        res.render('addReview', { movie });
    } catch (error) {
        console.error('Error al mostrar el formulario de creación de reseñas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/:movieId/add', isAuthenticated, async (req, res) => {
    const { movieId } = req.params;
    const { title, opinion, score } = req.body;

    try {
        if (!req.isAuthenticated()) {
            return res.status(401).send('Acceso no autorizado. Inicia sesión para agregar reseñas.');
        }

        const parsedScore = parseInt(score);
        if (isNaN(parsedScore) || parsedScore < 1 || parsedScore > 5) {
            return res.status(400).send('El puntaje debe ser un número entre 1 y 5.');
        }

        await prisma.post.create({
            data: {
                title,
                opinion,
                score: parsedScore,
                author: { connect: { nickname: req.user.nickname } },
                movie: { connect: { titleMov: movieId } },
            },
        });

        res.redirect(`/reviews/${movieId}`);
    } catch (error) {
        console.error('Error al agregar la reseña:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/:id/delete', isAuthenticated, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).send('Acceso denegado. Solo los administradores pueden eliminar reseñas.');
        }

        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id },
            include: { movie: true, author: true },
        });
        if (!post) {
            return res.status(404).send('Reseña no encontrada.');
        }
        await prisma.post.delete({
            where: { id },
        });
        res.redirect(`/reviews/${post.movie.titleMov}`);
    } catch (error) {
        console.error('Error al eliminar la reseña:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;

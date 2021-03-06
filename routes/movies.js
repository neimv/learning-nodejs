/**
 * @class       : movies
 * @author      : neimv (neimv@dark-world)
 * @created     : jueves sep 23, 2021 17:29:02 CDT
 * @description : movies
 */

const express = require('express');
const MoviesService = require('../services/movies');

const { createMovieSchema, updateMovieSchema, movieIdSchema } = require('../utils/schemas/movies')
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheReponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);
    const moviesService = new MoviesService();

    router.get('/', async function(req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });
            // throw new Error('Error getting movies');

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch(err) {
            next(err);
        }
    });
    
    router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { movieId } = req.params;

        try {
            const movie = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movie,
                message: 'movie retrieved'
            })
        } catch(err) {
            next(err);
        }
    });

    router.post('/', validationHandler(createMovieSchema), async function(req, res, next) {
        const { body: movie } = req;
        try {
            const createMovieId = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createMovieId,
                message: 'movie created'
            })
        } catch(err) {
            next(err);
        }
    });

    router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function(req, res, next) {
        const { body: movie } = req;
        const { movieId } = req.params;

        try {
            const updateMovieId = await moviesService.updateMovie({movieId, movie});

            res.status(200).json({
                data: updateMovieId,
                message: 'movie updated'
            })
        } catch(err) {
            next(err);
        }
    });

    router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next) {
        const { movieId } = req.params;
        try {
            const deleteMovieId = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deleteMovieId,
                message: 'movie deleted'
            })
        } catch(err) {
            next(err);
        }
    });
}

module.exports = moviesApi;


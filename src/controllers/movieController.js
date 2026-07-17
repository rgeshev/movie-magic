import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter, pageTitle: 'Search Movies' });
});

movieController.get('/create', isAuth,(req, res) => {
    res.render('movies/create', { pageTitle: 'Create Movie' });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;

    await movieService.create(newMovie, userId);

    res.redirect('/');
});

// Details page
movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req?.user.id;

    const movie = await movieService.getById(movieId);

    const isOwner = movie.userId && movie.userId === userId;

    // Prepare view data | Quick and dirty solution TODO: Fix it
    const ratingStars = '&#x2605;'.repeat(Math.floor(movie.rating));

    res.render('movies/details', { movie, pageTitle: 'Movie Details', ratingStars, isOwner });
});

movieController.get('/:movieId/attach', isAuth,async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId);
    const artists = await artistService.getAll({exclude: movie.artists.map(artist => artist.id)});

    res.render('movies/attach', { pageTitle: 'Attach Movie', movie, artists });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    await movieService.remove(movieId, userId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    const movie = await movieService.getById(movieId);

    if (movie.userId !== userId) {
        return res.status(401).send('Unauthorized');
    }

    res.render('movies/edit', { pageTitle: 'Edit Movie', movie });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;
    const movieData = req.body;

    await movieService.edit(movieId, movieData, userId);

    res.redirect(`/movies/${movieId}`);
});

export default movieController;
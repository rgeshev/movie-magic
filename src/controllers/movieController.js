import { Router } from 'express';
import movieService from '../services/movieService.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.create(newMovie);

    res.redirect('/');
});

// Details page
movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId);

    res.render('movies/details', { movie })
});

export default movieController;
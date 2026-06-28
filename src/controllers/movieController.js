import { Router } from 'express';
import { create } from 'express-handlebars';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', (req, res) => {
    console.log('post request received');
});

export default movieController;
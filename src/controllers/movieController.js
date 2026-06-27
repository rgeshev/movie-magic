import { Router } from 'express';
import { create } from 'express-handlebars';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create');
})

export default movieController;
import { Router } from 'express';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();
    res.render('home');
});

homeController.get('/about', (req, res) => {
    res.render('about');
});


export default homeController;
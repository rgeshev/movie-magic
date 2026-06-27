import express from 'express';
import { engine } from 'express-handlebars';
import homeController from './controllers/homeController.js';

const app = express();

// Setup handlebars
app.engine('hbs', engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Setup static assets
app.use(express.static('./src/public'));

// Setup routes
app.use('/', homeController);

// Start the server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
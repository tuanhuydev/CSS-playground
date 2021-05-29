const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const sassMiddleware = require('node-sass-middleware')
const webRouter = require('./src/routers/web');

const app = express();
const port = 3000;

/**
 * Note: you must place sass-middleware *before* `express.static`
 */
app.use(sassMiddleware({
    src: path.resolve(__dirname, 'src/stylesheets'),
    dest: path.resolve(__dirname, 'public'),
    debug: true,
    force: true,
    indentedSyntax: false,
    error: (error => console.error(`ERROR: ${error}`)),
}));

app.set('views', path.join(__dirname, '/src/views'));

/**
 * Setup view engine
 */
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: false,
}));
app.set('view engine', '.hbs');

/**
 * Setup static folders
 */
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

/**
 * ROUTERS
 */

// app.get('/trillo', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views/trillo.html'));
// });

// app.get('/nexter', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views/nexter.html'));
// });
app.use('/', webRouter);
// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.get('/', (req, res) => {
//     res.end('Hello World');
// });


/**
 * Serve application
 */
app.listen(port, () => {
    console.log(`Server is listenning at http://localhost:${port}`);
});
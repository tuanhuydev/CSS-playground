const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const sassMiddleware = require('node-sass-middleware')
const webRouter = require('./src/routers/web');

const app = express();

/**
 * Note: you must place sass-middleware *before* `express.static`
 */
app.use(sassMiddleware({
    src: path.resolve(__dirname, 'src/stylesheets'),
    dest: path.resolve(__dirname, 'public'),
    debug: true,
    force: true,
    // outputStyle: 'compressed',
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
app.use('/images', express.static(path.join(__dirname, 'src/images')));

/**
 * ROUTERS
 */

app.use('/', webRouter);

/**
 * Serve application
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listenning at http://localhost:${port}`);
});

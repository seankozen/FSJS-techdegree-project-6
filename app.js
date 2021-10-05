// Import Express 
const express = require('express');
const app = express();
const path = require('path');

// View engine setup
app.set('view engine', 'pug');

// Import routes
const routes = require('./routes');

// Parse JSON
app.use(express.urlencoded({ extended: false }));

// Add static middleware
app.use('/static', express.static('public'));

// For using index routes
const mainRoute = require('./routes/index');
app.use(mainRoute);

// 404 Error handler for dead or broken links
app.use((req, res, next) =>{
    const err = new Error();
    err.message = 'Sorry, the page you are looking for does not exist or the link is broken.';
    err.status = 404;
    res.status(404).render('pageNotFound', {err});
    console.log(err);
});

// Handle Global Errors
app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err);
    }

    // 404 Error
    if (err.status === 404) {
        res.status(404).render('pageNotFound', {err}); 
    } 
    // 500 Error 
    else { 
        err.message = err.message || `Uh-oh.  Looks like something is wrong with the server.`;
        res.status(err.status || 500).render('error', {err});
    }
});

// Turn on Express server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


module.exports = app;

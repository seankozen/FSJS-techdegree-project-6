const express = require('express');
const router = express.Router();
const {projects} = require('../data/data.json');

// For the rendering the About page
router.get('/about', (req, res) => {
    res.render('about');
}) 

// For the rendering the Projects page
router.get('/', (req, res ) => {
    res.render('index', {projects});
});

// For the rendering of the dynamic portfolio pages
router.get('/project/:id', (req, res, next) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(({id}) => id === projectId);

    if(project) {
        res.render('project', {project});
    } else {
        const err = new Error();
        err.message = 'Uh-oh.  Looks like something is wrong with the server.';
        err.status = 500;
        next(err);
    }
});
 
module.exports = router;
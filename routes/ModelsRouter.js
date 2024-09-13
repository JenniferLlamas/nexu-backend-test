const express = require('express');
const ModelsController = require('../app/controllers/ModelsController');
const router = express.Router();

 
module.exports = router
    .put('/models/:id',                   ModelsController.update)
    .get('/models',                       ModelsController.list)
    
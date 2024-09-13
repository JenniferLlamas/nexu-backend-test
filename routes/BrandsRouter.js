const express = require('express');
const BrandsController = require('../app/controllers/BrandsController.js');
const router = express.Router();

 
module.exports = router
.get('/brands',                          BrandsController.list)
.get('/brands/:id/models',               BrandsController.getModels)

.post('/brands',                         BrandsController.add)
.post('/brands/:id/models',              BrandsController.addModels)

const express = require('express');
const router = express.Router();
const {getAllSpecies, getSingleSpece, addSpece} = require('../db/queries/specieQueries.js');


router.get('/', getAllSpecies);
router.get('/:id', getSingleSpece);
router.post('/', addSpece);




module.exports = router;

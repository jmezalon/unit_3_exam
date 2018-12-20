const express = require('express');
const router = express.Router();
const {getAllTaggings, getSingleTag, researcherTaggings, animalTaggings, addTag} = require('../db/queries/taggingQueries.js');


router.get('/', getAllTaggings);
router.get('/:id', getSingleTag);
router.get('/researcher/:id', researcherTaggings);
router.get('/animal/:id', animalTaggings);
router.post('/', addTag);




module.exports = router;

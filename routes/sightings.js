const express = require('express');
const router = express.Router();
const {getAllSightings, speceSightings, researcherSightings, habitatSightings, addSight, removeSight} = require('../db/queries/sightingQueries.js');


router.get('/', getAllSightings);
router.get('/species/:id', speceSightings);
router.get('/researcher/:id', researcherSightings);
router.get('/habitat/:id', habitatSightings);
router.post('/', addSight);
router.delete('/:id', removeSight);



module.exports = router;

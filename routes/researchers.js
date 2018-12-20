const express = require('express');
const router = express.Router();
const {getAllResarchers, getSingleResearcher, addResearcher, updateResearcher, removeResearcher} = require('../db/queries/researcherQueries.js');


router.get('/', getAllResarchers);
router.get('/:id', getSingleResearcher);
router.post('/', addResearcher);
router.patch('/:id', updateResearcher);
router.delete('/:id', removeResearcher);



module.exports = router;

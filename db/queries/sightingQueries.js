const { db } = require('./connections.js');

const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings')
  .then(sightings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is all the sightings',
      body: sightings
    })
  })
  .catch(err => next(err));
}

const speceSightings = (req, res, next) => {
  let speceId = parseInt(req.params.id)
  db.any('SELECT sightings.* FROM species JOIN sightings ON sightings.species_id = species.id WHERE species.id=$1', [speceId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'all sightings from ONE spece'
    })
  })
  .catch(err => next(err))
}

const researcherSightings = (req, res, next) => {
  let researcherId = parseInt(req.params.id)
  db.any('SELECT sightings.* FROM researchers JOIN sightings ON sightings.researcher_id = researchers.id WHERE researchers.id=$1', [researcherId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'all sightings from ONE researcher'
    })
  })
  .catch(err => next(err))
}

const habitatSightings = (req, res, next) => {
  let habitatId = parseInt(req.params.id)
  db.any('SELECT sightings.* FROM habitats JOIN sightings ON sightings.habitat_id = habitats.id WHERE habitats.id=$1', [habitatId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'all sightings from ONE habitat'
    })
  })
  .catch(err => next(err))
}

const addSight = (req, res, next) => {
  db.none('INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you added a sighting'
    })
  })
  .catch(err => next(err));
}


const removeSight = (req, res, next) => {
  let sightId = parseInt(req.params.id);
  db.result('DELETE FROM sightings WHERE id=$1', sightId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this sight',
      body: result
    })
  })
  .catch(err => next(err));
}


module.exports = {getAllSightings, speceSightings, researcherSightings, habitatSightings, addSight, removeSight}

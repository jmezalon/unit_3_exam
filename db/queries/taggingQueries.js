const { db } = require('./connections.js');

const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings')
  .then(taggings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is all the taggings',
      body: taggings
    })
  })
  .catch(err => next(err));
}

const getSingleTag = (req, res, next) => {
  let tagId = parseInt(req.params.id)
  db.one('SELECT * FROM taggings WHERE id=$1', tagId)
  .then(tag => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is ONE tag',
      body: tag
    })
  })
  .catch(err => next(err));
}


const researcherTaggings = (req, res, next) => {
  let researcherId = parseInt(req.params.id)
  db.any('SELECT taggings.* FROM researchers JOIN taggings ON taggings.researcher_id = researchers.id WHERE researchers.id=$1', [researcherId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'all taggings from ONE researcher'
    })
  })
  .catch(err => next(err))
}

const animalTaggings = (req, res, next) => {
  let animalId = parseInt(req.params.id)
  db.any('SELECT taggings.* FROM animals JOIN taggings ON taggings.animal_id = animals.id WHERE animals.id=$1', [animalId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'all taggings from ONE animal'
    })
  })
  .catch(err => next(err))
}


const addTag = (req, res, next) => {
  db.none('INSERT INTO taggings(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you added a tag'
    })
  })
  .catch(err => next(err));
}



module.exports = {getAllTaggings, getSingleTag, researcherTaggings, animalTaggings, addTag};

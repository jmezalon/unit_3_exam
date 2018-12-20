const { db } = require('./connections.js');

const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats')
  .then(habitats => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is all the habitats',
      body: habitats
    })
  })
  .catch(err => next(err));
}

const getSingleHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id)
  db.one('SELECT * FROM habitats WHERE id=$1', habitatId)
  .then(habitat => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is ONE habitat',
      body: habitat
    })
  })
  .catch(err => next(err));
}

const addHabitat = (req, res, next) => {
  db.none('INSERT INTO habitats(category) VALUES(${category})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you added a habitat'
    })
  })
  .catch(err => next(err));
}



module.exports = {getAllHabitats, getSingleHabitat, addHabitat};

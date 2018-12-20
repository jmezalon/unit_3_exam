const { db } = require('./connections.js');

const getAllSpecies = (req, res, next) => {
  db.any('SELECT * FROM species')
  .then(species => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is all the species',
      body: species
    })
  })
  .catch(err => next(err));
}

const getSingleSpece = (req, res, next) => {
  let speceId = parseInt(req.params.id)
  db.one('SELECT * FROM species WHERE id=$1', speceId)
  .then(spece => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is ONE spece',
      body: spece
    })
  })
  .catch(err => next(err));
}

const addSpece = (req, res, next) => {
  db.none('INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you added a spece'
    })
  })
  .catch(err => next(err));
}



module.exports = {getAllSpecies, getSingleSpece, addSpece};

const { db } = require('./connections.js');

const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals')
  .then(animals => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is all the animals',
      body: animals
    })
  })
  .catch(err => next(err));
}

const getSingleAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id)
  db.one('SELECT * FROM animals WHERE id=$1', animalId)
  .then(animal => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is ONE animal',
      body: animal
    })
  })
  .catch(err => next(err));
}

const addAnimal = (req, res, next) => {
  db.none('INSERT INTO animals(species_id, nickname) VALUES(${species_id}, ${nickname})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you added a animal'
    })
  })
  .catch(err => next(err));
}

const updateAnimal = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ")
  db.none(
      "UPDATE animals SET " + queryString + " WHERE id=" + req.params.id, req.body
    )
    .then(() => {
      res.status(200)
      .json({
        status: "success",
        message: "you updated a animal!"
      });
    })
    .catch(err => next(err));
};


const removeAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE id=$1', animalId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this animal',
      body: result
    })
  })
  .catch(err => next(err));
}


module.exports = {getAllAnimals, getSingleAnimal, addAnimal, updateAnimal, removeAnimal}

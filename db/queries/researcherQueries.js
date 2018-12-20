const { db } = require('./connections.js');

const getAllResarchers = (req, res, next) => {
  db.any('SELECT * FROM researchers')
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is all the researchers',
      body: data
    })
  })
  .catch(err => next(err));
}

const getSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id)
  db.one('SELECT * FROM researchers WHERE id=$1', researcherId)
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'this is ONE researcher',
      body: data
    })
  })
  .catch(err => next(err));
}

const addResearcher = (req, res, next) => {
  db.none('INSERT INTO researchers(name, job_title) VALUES(${name}, ${job_title})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you added a researcher'
    })
  })
  .catch(err => next(err));
}

const updateResearcher = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ")
  db.none(
      "UPDATE researchers SET " + queryString + " WHERE id=" + req.params.id, req.body
    )
    .then(() => {
      res.status(200)
      .json({
        status: "success",
        message: "you updated a researcher!"
      });
    })
    .catch(err => next(err));
};


const removeResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE id=$1', researcherId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this researcher',
      body: result
    })
  })
  .catch(err => next(err));
}


module.exports = {getAllResarchers, getSingleResearcher, addResearcher, updateResearcher, removeResearcher}

const express = require('express');
const app = express();
const bodyParser = require('body-Parser');
const researchers = require('./routes/researchers.js');
const species = require('./routes/species.js');
const animals = require('./routes/animals.js');
const habitats = require('./routes/habitats.js');
const taggings = require('./routes/taggings.js');
const sightings = require('./routes/sightings.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/researchers', researchers);
app.use('/species', species);
app.use('/animals', animals);
app.use('/habitats', habitats);
app.use('/taggings', taggings);
app.use('/sightings', sightings);


app.get('/', (req, res) => {
  res.send('this is the homepage')
})


app.get('*', (req, res) => {
  res.send('Error')
})


app.listen(3018, () => {
  console.log('you are doing unit_3_exam on port 3018')
})

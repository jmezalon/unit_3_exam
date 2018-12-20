const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/unit_3_exam');

module.exports = { db }

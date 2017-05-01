const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('venue')
  .select()
  .then(function (result) {
    res.json(result);
  })
})
module.exports = router;

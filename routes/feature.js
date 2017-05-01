const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('feature')
  .select()
  .then(function (result) {
    res.json(result);
  })
});
router.get('/:id', function(req, res) {
  knex('feature')
  .select()
  .where('feature.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
})

router.post('/', function(req, res){

  knex('feature').insert({
    feature: req.body.feature,
  }, 'id').then(function(result){
    res.json(result);
  });
});

router.delete('/:id', function(req, res){

  knex('feature').where('id', req.params.id).del().then(function(result){
    res.json(result);
  });

});

module.exports = router;

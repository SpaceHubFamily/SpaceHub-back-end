const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('feature_room')
  .select()
  .then(function (result) {
    res.json(result);
  })
});

router.get('/:id', function(req, res) {
  knex('feature_room')
  .select()
  .where('feature_room.room_id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
})

router.post('/', function(req, res){

  knex('feature_room').insert({
    name: req.body.name,
    capacity: req.body.capacity,
    hour_rate: req.body.hour_rate,
    day_rate: req.body.hour_rate,
    img_url: req.body.img_url,
    available: req.body.available,
    venue_id: knex('venue').where('name', req.body.name).select('id'),
  }, 'id').then(function(result){
    res.json(result);
  });
});

router.patch('/:id', function(req, res){

knex('feature_room').where('id', req.params.id).update({
  name: req.body.name,
  subject_id: knex('subject').where('name', req.body.subject).select('id'),
})
.then(function(result){
  res.json(result)
  })
});

router.delete('/:id', function(req, res){

  knex('feature_room').where('id', req.params.id).del().then(function(result){
    res.json(result);
  });

});

module.exports = router;

const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('room')
  .select()
  .then(function (result) {
    res.json(result);
  })
});

router.get('/user/:id', function(req, res) {
  knex('room')
  .join('venue', 'venue.id', '=', 'room.venue_id')
  .join('user', 'user.id', '=', 'venue.user_id')
  .select('venue.name as venue_name', 'room.name as room_name', 'hour_rate',
    'day_rate', 'room.img_url as room_img_url', 'room.available as room_available',
    'user.first_name', 'user.last_name', 'user.img_url as user_img_url', 'user.phone_number',
    'user.company_name', 'user.email', 'user.description as company_description',
    'user.venue_owner', 'user.event_planner', 'venue.name as venue_name')
  .where('user.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
});

router.get('/:id', function(req, res) {
  knex('room')
  .select()
  .where('room.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
});

router.post('/', function(req, res){

  knex('room').insert({
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

knex('room').where('id', req.params.id).update({
  name: req.body.name,
  subject_id: knex('subject').where('name', req.body.subject).select('id'),
})
.then(function(result){
  res.json(result)
  })
});

router.delete('/:id', function(req, res){

  knex('room').where('id', req.params.id).del().then(function(result){
    res.json(result);
  });

});

module.exports = router;

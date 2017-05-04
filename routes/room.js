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
  if(req.session.userId) {
  return knex('room')
  .join('venue', 'venue.id', '=', 'room.venue_id')
  .join('users', 'users.id', '=', 'venue.user_id')
  .select('venue.name as venue_name', 'room.name as room_name', 'hour_rate',
    'day_rate', 'room.img_url as room_img_url', 'room.available as room_available',
    'users.first_name', 'users.last_name', 'users.img_url as user_img_url', 'users.phone_number',
    'users.company_name', 'users.email', 'users.description as company_description',
    'users.venue_owner', 'users.event_planner', 'venue.name as venue_name')
  .where('users.id', req.params.userId)
  .then(function (result) {
    res.json(result);
  })
}
return res.status(401).send('not logged in');
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
    venue_id: knex('venue').where('name', req.body.venue).select('id'),
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

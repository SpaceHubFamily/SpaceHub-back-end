const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('shindig')
  .select()
  .then(function (result) {
    res.json(result);
  })
});

router.get('/:id', function(req, res) {
  knex('shindig')
  .select()
  .where('shindig.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
});

router.get('/user/:id', function(req, res) {
  knex('shindig')
  .join('user', 'user.id', '=', 'shindig.user_id')
  .join('venue', 'venue.id', '=', 'shindig.room_id')
  .join('room', 'room.venue_id', '=', 'venue_id')
  .select('shindig.date', 'shindig.start_time', 'shindig.end_time',
   'user.first_name', 'user.last_name', 'user.phone_number',
    'user.company_name', 'user.email as user_email',
    'user.description as company_description', 'user.venue_owner',
    'user.event_planner', 'venue.address as venue_address',
    'venue.city as venue_city', 'venue.state as venue_state',
    'venue.zip_code as venue_zip_code', 'venue.name as venue_name',
    'venue.email as venue_email', 'venue.phone as venue_phone',
    'venue.description as venue_description', 'venue.img_url as venue_img_url',
    'room.name as room_name', 'room.capacity as room_capacity',
    'room.hour_rate as room_hourly_rate', 'room.day_rate as room_daily_rate',
    'room.img_url as room_img_url', 'room.available as room_available')
  .where('user.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
});

router.post('/', function(req, res){

  knex('shindig').insert({
    date: req.body.date,
    start_time: req.body.start_time,
    user_id: knex('user').where('name', req.body.user).select('id'),
    room_id: knex('room').where('name', req.body.room).select('id'),
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

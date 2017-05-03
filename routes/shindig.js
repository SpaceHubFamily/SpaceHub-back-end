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
  .leftJoin('users', 'users.id', '=', 'shindig.user_id')
  .leftJoin('room', 'room.id', '=', 'shindig.room_id')
  .leftJoin('venue', 'venue.id', '=', 'room.venue_id')
  .select('users.first_name', 'users.last_name', 'users.img_url as user_img_url',
  'users.phone_number as user_phone_number', 'users.company_name',
  'users.description as user_description', 'users.email as user_email',
  'shindig.date as shindig_date', 'shindig.start_time', 'shindig.end_time',
  'shindig.available as shindig_available', 'room.name as room_name',
  'room.capacity as room_capacity', 'room.hour_rate', 'room.day_rate',
  'room.img_url as room_img_url', 'room.available as room_available',
  'venue.address as venue_address', 'venue.city as venue_city',
  'venue.state as venue_state', 'venue.zip_code as venue_zip_code',
  'venue.name as venue_name', 'venue.email as venue_email',
  'venue.email as venue_email', 'venue.phone as venue_phone',
  'venue.description as venue_description', 'venue.img_url as venue_img_url',
  'shindig.id as id')
  .then(function (result) {
    res.json(result);
  })
});

router.get('/user/:id', function(req, res) {
  knex('shindig')
  .join('users', 'users.id', '=', 'shindig.user_id')
  .join('venue', 'venue.id', '=', 'shindig.room_id')
  .join('room', 'room.venue_id', '=', 'venue_id')
  .select('shindig.date', 'shindig.start_time', 'shindig.end_time',
   'users.first_name', 'users.last_name', 'users.phone_number',
    'users.company_name', 'users.email as user_email',
    'users.description as company_description', 'users.venue_owner',
    'users.event_planner', 'venue.address as venue_address',
    'venue.city as venue_city', 'venue.state as venue_state',
    'venue.zip_code as venue_zip_code', 'venue.name as venue_name',
    'venue.email as venue_email', 'venue.phone as venue_phone',
    'venue.description as venue_description', 'venue.img_url as venue_img_url',
    'room.name as room_name', 'room.capacity as room_capacity',
    'room.hour_rate as room_hourly_rate', 'room.day_rate as room_daily_rate',
    'room.img_url as room_img_url', 'room.available as room_available')
  .where('users.id', req.params.id)
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

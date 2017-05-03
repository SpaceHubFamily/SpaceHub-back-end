const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('shindig_request')
  .select()
  .then(function (result) {
    res.json(result);
  })
});
let myObject;
router.get('/:id', function(req, res) {
  knex('shindig_request')
  .join('shindig', 'shindig_request.shindig_id', '=', 'shindig.id')
  .join('users', 'users.id', '=', 'shindig_request.user_id')
  .join('room', 'room.id', '=', 'shindig.room_id')
  .join('venue', 'venue.id', '=', 'room.venue_id')
  .select('shindig.date as requested_date', 'shindig.start_time',
    'shindig.end_time', 'shindig.available', 'shindig.user_id as owner_id',
    'users.first_name as requester_first_name',
    'users.last_name as requester_last_name',
    'users.img_url as requester_img_url',
    'users.phone_number as requester_phone_number',
    'users.company_name as requester_company_name',
    'users.email as requester_email',
    'users.description as requester_description',
    'room.name as room_name', 'room.capacity', 'room.hour_rate',
    'room.day_rate', 'room.img_url as room_img_url',
    'venue.address as venue_address', 'venue.address as venue_address',
    'venue.city', 'venue.state', 'venue.zip_code', 'venue.name as venue_name',
    'venue.email as venue_email', 'venue.phone as venue_phone',
    'venue.description as venue_description', 'venue.img_url as venue_img_url')
  .where('shindig_request.shindig_id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
})

router.post('/', function(req, res){

  knex('shindig_request').insert({
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

knex('shindig_request').where('id', req.params.id).update({
  name: req.body.name,
  subject_id: knex('subject').where('name', req.body.subject).select('id'),
})
.then(function(result){
  res.json(result)
  })
});

router.delete('/:id', function(req, res){

  knex('shindig_request').where('id', req.params.id).del().then(function(result){
    res.json(result);
  });

});

module.exports = router;

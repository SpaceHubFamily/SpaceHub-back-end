const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  if (req.session.userId) {
  return knex('shindig_request')
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
  .where('shindig.user_id', req.session.userId)
  .then(function(result) {
    res.json(result);
  })
}
return res.status(401).send('not logged in')
})

// router.get('/', function(req, res) {
//   if(req.session.userId){
//     return knex('shindig_request')
//     .join('shindig', 'shindig_request.shindig_id', '=', 'shindig.id')
//     .join('users', 'users.id', '=', 'shindig_request.user_id')
//     .join('room', 'room.id', '=', 'shindig.room_id')
//     .join('venue', 'venue.id', '=', 'room.venue_id')
//     .select('shindig.date as requested_date', 'shindig.start_time',
//       'shindig.end_time', 'shindig.available', 'shindig.user_id as owner_id',
//       'users.first_name as requester_first_name',
//       'users.last_name as requester_last_name',
//       'users.img_url as requester_img_url',
//       'users.phone_number as requester_phone_number',
//       'users.company_name as requester_company_name',
//       'users.email as requester_email',
//       'users.description as requester_description',
//       'room.name as room_name', 'room.capacity', 'room.hour_rate',
//       'room.day_rate', 'room.img_url as room_img_url',
//       'venue.address as venue_address', 'venue.address as venue_address',
//       'venue.city', 'venue.state', 'venue.zip_code', 'venue.name as venue_name',
//       'venue.email as venue_email', 'venue.phone as venue_phone',
//       'venue.description as venue_description', 'venue.img_url as venue_img_url')
//     .where('shindig_request.user_id', req.params.userId)
//     .then(function (result) {
//       res.json(result);
//     })
//   }
//   return res.status(401).send('not logged in')
// });

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
    .where('shindig_request.user_id', req.params.userId)
    .then(function (result) {
      res.json(result);
    })
})

router.get('/user/:id', function(req, res) {
  if(req.session.userId){
    return knex('shindig_request')
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
    .where('shindig_request.user_id', req.params.id)
    .then(function (result) {
      res.json(result);
    })
  }
  return res.status(401).send('not logged in')
})

router.post('/', function(req, res){

  knex('shindig_request').insert({
    shindig_id: req.body.shindig_id,
    user_id: req.body.user_id
  }, 'user_id').then(function(result){
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

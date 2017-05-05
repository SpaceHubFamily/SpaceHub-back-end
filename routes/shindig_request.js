const router = require('express').Router();
const knex = require('../db/knex');
const nodemailer = require('nodemailer');

router.get('/', function (req, res) {
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
    .then(function (result) {
      res.json(result);
    })
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
router.get('/:id', function (req, res) {
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
    .where('shindig_request.user_id', req.params.id)
    .then(function (result) {
      res.json(result);
    })
})

router.get('/user/:id', function (req, res) {
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
      'venue.description as venue_description', 'venue.img_url as venue_img_url',
      'shindig.id as shindig_id', 'shindig_request.id as unique_id')
    .where('shindig_request.user_id', req.params.id)
    .then(function (result) {
      res.json(result);
    })
})


// create reusable transporter object using the default SMTP transport

router.post('/request', (req, res) => {
console.log('here');
console.log(req.body);

  let c_email = req.body.company_email
  let u_first_name = req.body.first_name
  let u_last_name = req.body.last_name
  let u_email = req.body.user_email // if you are not saving this info anywhere - don't worry about it
  let u_pass = req.body.user_pass // same here
  console.log('here 2');
  let transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: u_email, // if this is not available just put one of our emails like so user: 'daria.calwell@gmail.com'
      pass: u_pass // same here
    }
  });
  console.log(transporter);
  // setup email data with unicode symbols

  let mailOptions = {
    from: `${u_first_name} ${u_last_name}, ${u_email}`, // sender address, you might not need quote marks, but you do need backteeks
    to: c_email, // list of receivers
    subject: 'I am interested in booking a room', // Subject line
    text: 'Hi, I would like to book a room for my event, please contact me ASAP', // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
      res.send(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.send('ok')
  });

})

router.post('/', function (req, res) {

  knex('shindig_request').insert({
    shindig_id: req.body.shindig_id,
    user_id: req.body.user_id
  }, 'user_id').then(function (result) {
    res.json(result);
  });
});

router.patch('/:id', function (req, res) {

  knex('shindig_request').where('id', req.params.id).update({
      name: req.body.name,
      subject_id: knex('subject').where('name', req.body.subject).select('id'),
    })
    .then(function (result) {
      res.json(result)
    })
});

router.delete('/:id', function (req, res) {

  knex('shindig_request').where('id', req.params.id).del().then(function (result) {
    res.json(result);
  });

});

module.exports = router;

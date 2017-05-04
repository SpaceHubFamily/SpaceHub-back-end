const router = require('express').Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  knex('users')
  .select()
  .then(function (result) {
    res.json(result);
  })
});

router.get('/:id', function(req, res) {
  knex('users')
  .select()
  .where('users.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
});
// router.get('/', (req, res) => {
//   if (req.session.userId) {
//     return knex('users')
//     .select()
//     .where('id', req.params.userId)
//     .then(([result]) => {
//       res.json(result);
//     });
//   }
//   return res.status(401).send('not logged in');
// });

router.get('/shindig/:id', function(req, res) {
  knex('users')
  .join('shindig', 'users.id', '=', 'shindig.user_id')
  .leftJoin('room', 'room.id', '=', 'shindig.room_id')
  .rightJoin('venue', 'room.venue_id', '=', 'venue.id')
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
    'room.img_url as room_img_url', 'room.available as room_available',
    'users.id as user_id')
    // .select("*", 'room.id as roRLSDJFom_id')
  .where('users.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
});

router.get('/room/:id', (req, res) => {
  knex('users')
  .select()
  .where('users.id', req.params.id)
  .then((result) => {
    res.json(result);
  });
});

router.post('/login', (req, res) => {
  knex('users')
  .select('id')
  .where('users.email', req.body.email)
  .then((result) => {
    if (result.length) {
      const [{ id }] = result;
      return knex('password').select('password').where('user_id', id)
      .then((passwordArray) => {
        if (passwordArray.length) {
          const [{ password }] = passwordArray;
          return bcrypt.compare(req.body.password, password)
          .then((validPassword) => {
            if (validPassword) {
              req.session.userId = id;
              return res.status(200).send('ok');
            }
            return res.status(401).send('unauthorized');
          });
        }
        return res.status(401).send('unauthorized');
      });
    }
    return res.status(401).send('unauthorized');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('server error');
  });
});

router.post('/', (req, res) => {
  knex('users').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    img_url: req.body.img_url,
    phone_number: req.body.phone_number,
    company_name: req.body.company_name,
    email: req.body.email,
    description: req.body.description,
    venue_owner: req.body.venue_owner,
    event_planner: req.body.event_planner,
  }, 'id')
  .then(([id]) =>
    bcrypt.hash(req.body.password, 10)
    .then(hashPassword =>
      knex('password').insert({
        user_id: id,
        password: hashPassword,
      }))
    .then(() => {
      req.session.userId = id;
    }))
  .then(() => {
    res.status(201).send('OK');
  })
  .catch(error => res.status(403).send(error.message));
});

router.patch('/', (req, res) => {
  knex('users').where('id', req.session.userId).update({
    name: req.body.name,
    subject_id: knex('subject').where('name', req.body.subject).select('id'),
  })
  .then((result) => {
    res.json(result);
  });
});

router.delete('/', (req, res) => {
  knex('users').where('id', req.session.userId).del().then((result) => {
    res.json(result);
  });
});

module.exports = router;

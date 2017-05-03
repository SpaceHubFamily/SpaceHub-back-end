const router = require('express').Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  if (req.session.userId) {
    return knex('users')
    .select()
    .where('id', req.session.userId)
    .then(([result]) => {
      res.json(result);
    });
  }
  return res.status(401).send('not logged in');
});

router.get('/room/:id', (req, res) => {
  knex('users')
  .select()
  .where('user.id', req.params.id)
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

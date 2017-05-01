const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('user')
  .select()
  .then(function (result) {
    res.json(result);
  })
});

router.get('/:id', function(req, res) {
  knex('user')
  .select()
  .where('user.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
})

router.post('/', function(req, res){

  knex('user').insert({
    date: req.body.date,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    img_url: req.body.img_url,
    phone_number: req.body.phone_number,
    company_name: req.body.company_name,
    email: req.body.email,
    description: req.body.description,
    venue_owner: req.body.venue_owner,
    event_planner: req.body.event_planner,
  }, 'id').then(function(result){
    res.json(result);
  });
});

router.patch('/:id', function(req, res){

knex('user').where('id', req.params.id).update({
  name: req.body.name,
  subject_id: knex('subject').where('name', req.body.subject).select('id'),
})
.then(function(result){
  res.json(result)
  })
});

router.delete('/:id', function(req, res){

  knex('user').where('id', req.params.id).del().then(function(result){
    res.json(result);
  });

});

module.exports = router;

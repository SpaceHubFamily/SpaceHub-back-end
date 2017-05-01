const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('venue')
  .select()
  .then(function (result) {
    res.json(result);
  })
});

router.get('/:id', function(req, res) {
  knex('venue')
  .select()
  .where('venue.id', req.params.id)
  .then(function (result) {
    res.json(result);
  })
})

router.post('/', function(req, res){

  knex('venue').insert({
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    img_url: req.body.img_url,
    user_id: knex('user').where('name', req.body.user).select('id'),
  }, 'id').then(function(result){
    res.json(result);
  });
});

router.patch('/:id', function(req, res){

knex('venue').where('id', req.params.id).update({
  name: req.body.name,
  subject_id: knex('subject').where('name', req.body.subject).select('id'),
})
.then(function(result){
  res.json(result)
  })
});

router.delete('/:id', function(req, res){

  knex('venue').where('id', req.params.id).del().then(function(result){
    res.json(result);
  });

});

module.exports = router;

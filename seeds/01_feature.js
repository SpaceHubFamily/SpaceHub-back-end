
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('feature').del()
    .then(function () {
      // Inserts seed entries
      return knex('feature').insert([
        { feature: 'alcohol' },
        { feature: 'food' },
        { feature: 'catering' },
        { feature: 'music' },
        { feature: 'dank memes' },
        { feature: 'dankest memes' },
      ]);
    });
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shindig_request').del()
    .then(function () {
      // Inserts seed entries
      return knex('shindig_request').insert([
        { shindig_id: 1, user_id: 1 },
        { shindig_id: 2, user_id: 2 },
        { shindig_id: 3, user_id: 3 },
        { shindig_id: 4, user_id: 4 },
        { shindig_id: 5, user_id: 2 },
        { shindig_id: 6, user_id: 6 },
        { shindig_id: 7, user_id: 3 },

      ]);
    });
};

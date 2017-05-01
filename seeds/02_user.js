
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { first_name: 'Stan', last_name: 'Marsh', email: 'bob@bobert.com', venue_owner: false, event_planner: true},
        { first_name: 'Eric', last_name: 'Cartmen', email: 'bob@bobert.com', venue_owner: false, event_planner: true},
        { first_name: 'Kyle', last_name: 'Broflovski', email: 'bob@bobert.com', venue_owner: false, event_planner: true},
        { first_name: 'Kenny', last_name: 'McCormick', email: 'bob@bobert.com', venue_owner: false, event_planner: true},
        { first_name: 'Randy', last_name: 'Marsh', email: 'bob@bobert.com', venue_owner: false, event_planner: true},
        { first_name: 'Wendy', last_name: 'Testaburger', email: 'bob@bobert.com', venue_owner: false, event_planner: true},
      ]);
    });
};

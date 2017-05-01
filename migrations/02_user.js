exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('img_url');
    table.string('phone_number');
    table.string('company_name');
    table.string('email');
    table.string('description', [1000]);
    table.boolean('venue_owner');
    table.boolean('event_planner');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};

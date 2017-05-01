exports.up = function(knex, Promise) {
  return knex.schema.createTable('shindig_request', function (table) {
    table.integer('shindig_id')
      .references('shindig.id')
      .onDelete('CASCADE');
    table.integer('user_id')
      .references('user.id')
      .onDelete('CASCADE');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shindig_request');
};

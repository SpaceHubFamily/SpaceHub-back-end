exports.up = function (knex, Promise) {
  return knex.schema.createTable('shindig_request', (table) => {
    table.integer('shindig_id')
      .references('shindig.id')
      .onDelete('CASCADE');
    table.integer('user_id')
      .references('users.id')
      .onDelete('CASCADE');

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('shindig_request');
};

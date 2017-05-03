exports.up = function (knex, Promise) {
  return knex.schema.createTable('password', (table) => {
    table.string('password');
    table.integer('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('password');
};

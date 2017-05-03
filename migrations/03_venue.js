exports.up = function (knex, Promise) {
  return knex.schema.createTable('venue', (table) => {
    table.increments();
    table.string('address');
    table.string('city');
    table.string('state');
    table.integer('zip_code');
    table.string('name');
    table.string('email');
    table.string('phone');
    table.string('description', [1000]);
    table.string('img_url');
    table.integer('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('venue');
};

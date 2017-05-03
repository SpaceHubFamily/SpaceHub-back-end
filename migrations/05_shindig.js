exports.up = function (knex, Promise) {
  return knex.schema.createTable('shindig', (table) => {
    table.increments();
    table.string('date');
    table.string('start_time');
    table.string('end_time');
    table.integer('user_id')
      .references('users.id')
      .onDelete('CASCADE');
    table.integer('room_id')
      .references('room.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('shindig');
};

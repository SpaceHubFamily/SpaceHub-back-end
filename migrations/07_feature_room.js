exports.up = function(knex, Promise) {
  return knex.schema.createTable('feature_room', function (table) {
    table.integer('feature_id')
      .references('feature.id')
      .onDelete('CASCADE');
    table.integer('room_id')
      .references('room.id')
      .onDelete('CASCADE');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('feature_room');
};

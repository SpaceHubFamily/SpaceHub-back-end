exports.up = function(knex, Promise) {
  return knex.schema.createTable('room', function (table) {
    table.increments();
    table.string('name');
    table.integer('capacity');
    table.decimal('hour_rate');
    table.decimal('day_rate');
    table.string('img_url');
    table.boolean('available')
    table.integer('venue_id')
      .references('venue.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('room');
};

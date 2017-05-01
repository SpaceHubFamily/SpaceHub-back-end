exports.up = function(knex, Promise) {
  return knex.schema.createTable('feature', function (table) {
    table.increments();
    table.string('feature');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('feature');
};

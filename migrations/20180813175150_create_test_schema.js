
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username');
    table.integer('age');
    table.boolean('premium');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

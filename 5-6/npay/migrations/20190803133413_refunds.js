
exports.up = function(knex, Promise) {
  return knex.schema.createTable('refunds', function (table) {
    table.increments();
    table.integer('amount').defaultTo(0);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_payments', function (table) {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.integer('amount').defaultTo(0);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};

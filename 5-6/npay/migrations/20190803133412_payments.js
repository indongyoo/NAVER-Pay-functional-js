
exports.up = function(knex, Promise) {
  return knex.schema.createTable('payments', function (table) {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.integer('group_payment_id').references('id').inTable('group_payments');
    table.integer('amount').defaultTo(0);
    table.integer('is_paid').defaultTo(0);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};

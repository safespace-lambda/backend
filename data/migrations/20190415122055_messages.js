exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.text('body', 160).notNullable();
    tbl
      .boolean('sent')
      .notNullable()
      .defaultTo(0);
    tbl.timestamp('scheduled').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .string('username')
      .notNullable()
      .unique();
    tbl.string('password').notNullable();
    tbl.timestamp('created').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

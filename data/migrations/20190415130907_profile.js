exports.up = function(knex, Promise) {
  return knex.schema.createTable('profile', tbl => {
    //primary
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('phone', 100)
      .unique()
      .notNullable();
    tbl
      .string('email', 100)
      .unique()
      .notNullable();
    tbl.string('timezone', 100);
    tbl.string('picture', 100);
    tbl.string('mood', 100);
    tbl.date('birthday');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('profile');
};

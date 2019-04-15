exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('table_name').insert([
        { user_id: 2, sent: true, scheduled: knex.fn.now() },
        { user_id: 23, sent: false, scheduled: knex.fn.now() },
        { user_id: 56, sent: true, scheduled: knex.fn.now() }
      ]);
    });
};

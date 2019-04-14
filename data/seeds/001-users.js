exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { username: 'Jonas', password: 'Jonas' },
        { username: 'Gill', password: 'Gill' },
        { username: 'Name', password: 'Name' }
      ]);
    });
};

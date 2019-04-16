const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profile')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('profile').insert([
        {
          user_id: 4,
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          timezone: 'Eastern',
          picture: faker.image.imageUrl(),
          mood: 'happy',
          birthday: '1 / 7 / 92'
        },
        {
          user_id: 5,
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          timezone: 'Central',
          picture: faker.image.imageUrl(),
          mood: 'sad',
          birthday: '1 / 5 / 98'
        },
        {
          user_id: 6,
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          timezone: 'Pacific',
          picture: faker.image.imageUrl(),
          mood: 'blah',
          birthday: '6 / 17 / 92'
        }
      ]);
    });
};

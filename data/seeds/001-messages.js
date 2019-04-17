exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([
        {
          user_id: 2,
          sent: true,
          scheduled: knex.fn.now(),
          body:
            'Lorem ipsum dolor sit amet, cu meis putant \
          rationibus cum. Ei scripta deleniti senserit \
          per. Vis et enim augue prompta, nominavi \
          disputationi te cum, vim at li.'
        },
        {
          user_id: 23,
          sent: false,
          scheduled: knex.fn.now(),
          body:
            'Lorem ipsum dolor sit amet, cu meis putant \
          rationibus cum. Ei scripta deleniti senserit \
          per. Vis et enim augue prompta, nominavi \
          disputationi te cum, vim at li.'
        },
        {
          user_id: 30,
          sent: true,
          scheduled: knex.fn.now(),
          body:
            'Lorem ipsum dolor sit amet, cu meis putant \
          rationibus cum. Ei scripta deleniti senserit \
          per. Vis et enim augue prompta, nominavi \
          disputationi te cum, vim at li.'
        }
      ]);
    });
};

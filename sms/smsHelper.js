const db = require('../data/config/dbConfig.js');

module.exports = {
  find
};

function find() {
  return db('messages')
    .select('id', 'sent', 'body')
    .where('sent' == 0);
}

const db = require('../data/config/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  getAll,
  remove
};

function find() {
  return db('messages').select('id', 'username');
}

function findBy(filter) {
  return db('messages').where(filter);
}

async function add(message) {
  const [id] = await db('messages').insert(message);
  return findById(id);
}

function findById(id) {
  return db('messages')
    .select('id', 'user_id', 'body', 'sent', 'scheduled')
    .where({ id });
}

function findByUserId(user_id) {
  return db('messages')
    .select('id', 'user_id', 'body', 'sent', 'scheduled')
    .where({ user_id });
}

function getAll() {
  return db('messages');
}

async function update(id, changes) {
  return db('messages')
    .select('id', 'message_id')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('messages')
    .where({ id })
    .del();
}

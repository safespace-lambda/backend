const db = require('../data/config/dbConfig.js');
const Messages = require('./messagesModel.js');

const completeMessage = {
  user_id: 1,
  body:
    'Lorem ipsum dolor sit amet, cu meis putant \
    rationibus cum. Ei scripta deleniti senserit \
    per. Vis et enim augue prompta, nominavi \
    disputationi te cum, vim at li.',
  sent: 0,
  scheduled: '04/25/2019 10:00:00'
};

const incompleteMessage = {
  body:
    'Lorem ipsum dolor sit amet, cu meis putant \
  rationibus cum. Ei scripta deleniti senserit \
  per. Vis et enim augue prompta, nominavi \
  disputationi te cum, vim at li.',
  sent: 0,
  scheduled: ''
};

const updatedMessage = {
  user_id: 2,
  body: "You aren't fat! Eat an extra donut today!",
  sent: 0,
  scheduled: '04/25/2019 13:00:00'
};

const incompleteUpdatedMessage = {
  user_id: 2,
  body: 'You can do this diet!'
};

describe('Messages Model', () => {
  describe('create', () => {
    beforeEach(async () => {
      await db('messages').truncate();
    });
    it('should send back created message', async () => {
      await Messages.add(completeMessage);
      const message = await db('messages');
      expect(message).toHaveLength(1);
      expect(message.scheduled).not.toBeNull();
    });
    it('return null array if required info missing', async () => {
      async function insertMessage() {
        await Messages.add(incompleteMessage);
      }
      const message = await db('messages');
      expect(Array.isArray(message)).toBe(true);
      expect(message).toHaveLength(0);
      expect(message).not.toBeNull();
    });
  });
  describe('update', () => {
    beforeEach(async () => {
      await db('messages').insert(completeMessage);
    });
    it('should update the message information provided', async () => {
      await Messages.update(1, updatedMessage);
      const [message] = await db('messages');
      expect(message.id).not.toBeNull();
      expect(message.body).toBe(updatedMessage.body);
      expect(message.sent).toBe(updatedMessage.sent);
      expect(message).not.toBeNull();
    });
    it('only update updated info', async () => {
      await Messages.update(1, incompleteUpdatedMessage);
      const [message] = await db('messages');
      expect(message).not.toBeNull();
      expect(message.body).toBe(incompleteUpdatedMessage.body);
      expect(message.user_id).toBe(incompleteUpdatedMessage.user_id);
      expect(message.scheduled).toBe(updatedMessage.scheduled);
      expect(message.sent).toBe(updatedMessage.sent);
    });
  });
  describe('delete()', () => {
    beforeEach(async () => {
      await Messages.add(completeMessage);
    });
    it('should delete the privided messages', async () => {
      const numMsg = await Messages.remove(1);
      expect(numMsg).toBe(1);
    });
  });
});

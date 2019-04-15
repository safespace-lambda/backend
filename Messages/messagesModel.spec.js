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

const incompleteMesage = {
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
    it('should send back created message', async () => {
      await Messages.insert(completeMessage);
      const message = await db('messages');
      expect(message).toHaveLength(1);
      expect(message).toBe(completeMessage);
      expect(message.body).toBe(completeMessage.body);
      expect(message.scheduled).not.toBeNull();
    });
    it('required info should be required', async () => {
      await Messages.insert(incompleteMesage);
      const message = await db('messages');
      expect(message).toBeNull();
    });
  });
  describe('update', () => {
    it('should update the message information provided', async () => {
      await Messages.update(updatedMessage);
      const message = await db('messages');
      expect(message).toBe(updatedmessage);
      expect(message.body).toBe(updatedMessage.body);
    });
    it('only update updated info', async () => {
      await Messages.update(incompleteUpdatedMessage);
      const message = await db('messages');
      expect(message).not.toBeNull();
      expect(message.body).toBe(incompleteUpdatedMessage.body);
      expect(message.user_id).toBe(incompleteUpdatedMessage.user_id);
    });
  });
});

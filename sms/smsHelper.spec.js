const db = require('../data/config/dbConfig.js');
const SMS = require('./smsHelper.js');

describe('sms helper', () => {
  describe('find', () => {
    it('should find messages that havent been sent', async () => {
      await SMS.find();
      const [res] = await db('messages');
      expect(res.sent).toBe(0);
    });
  });
});

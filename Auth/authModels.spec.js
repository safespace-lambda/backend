const db = require('../data/config/dbConfig.js');
const Auth = require('./authModels.js');

completeUser = { username: 'TestUser', password: 'badPass' };

describe.skip('Auth', () => {
  describe('Signup', () => {
    it('confirm password is hashed', async () => {
      await Auth.insert(completeUser);
      const user = await db('users');
      expect(user.password).not.ToBe(password);
      expect(bcrypt.compareSync(password, user.password)).toBeTruthy();
    });
    it('should send create user', async () => {
      await Auth.insert(completeUser);
      const user = await db('users');
      expect(user).toHaveLength(1);
      expect(user.username).toBe(completeuser.username);
      expect(user.password).not.toBeNull();
    });
    it('required info should be required', async () => {
      await Auth.insert({ username: '', password: 'badpass2' });
      const user = await db('users');
      expect(user).toBeNull();
    });
  });
  describe('Login', () => {
    it('confirm password is checked', async () => {
      await Auth.post(completeUser);
      const user = await db('users');
      expect(user.password).not.ToBe(password);
      expect(bcrypt.compareSync(password, user.password)).toBeTruthy();
    });
    it('requires all fields', async () => {
      await Auth.post({ username: 'WheresThePass', password: '' });
      const user = await db('users');
      expect(user).toBeNull();
    });
  });
});

const db = require('../data/config/dbConfig.js');
const Profiles = require('./profilesModel.js');

const completeProfile = {
  user_id: 1,
  phone_number: '12125551212',
  email: 'test@email.com',
  timezone: 'America/New_York',
  picture: 'URL',
  mood: 'Suicidal',
  birthday: '01/01/2000'
};

const incompleteProfile = {
  user_id: 1,
  phone_number: '',
  email: '',
  timezone: 'America/New_York',
  picture: 'URL',
  mood: 'Suicidal',
  birthday: '01/01/2000'
};

const updatedProfile = {
  user_id: 1,
  phone_number: '13105550000',
  email: 'westcoast@email.com',
  timezone: 'America/Los_Angeles',
  picture: 'URL',
  mood: 'Happy',
  birthday: '02/02/2002'
};

const incompleteUpdatedProfile = {
  user_id: 1,
  phone_number: '',
  email: '',
  timezone: '',
  picture: '',
  mood: 'Happy',
  birthday: '02/02/2002'
};

describe('profiles model', () => {
  describe('create', () => {
    it('should insert the profile information provided', async () => {
      await Profiles.insert(completeProfile);
      const profile = await db('profiles');
      expect(profile).toHaveLength(1);
      expect(profile).toBe(completeProfile);
      expect(profile.email).toBe(completeProfile.email);
      expect(profile.timezone).not.toBeNull();
    });
    it('required info should be required', async () => {
      await Profiles.insert(incompleteProfile);
      const profile = await db('profiles');
      expect(profile).toBeNull();
    });
  });
  describe('update', () => {
    it('should update the profile information provided', async () => {
      await Profiles.update(updatedProfile);
      const profile = await db('profiles');
      expect(profile).toBe(updatedProfile);
      expect(profile.mood).toBe(updatedProfile.mood);
    });
    it('only update updated info', async () => {
      await Profiles.insert(incompleteUpdatedProfile);
      const profile = await db('profiles');
      expect(profile).not.toBeNull();
      expect(profile.timezone).toBe(updatedProfile.timezone);
      expect(profile.mood).toBe(incompleteUpdatedProfile.mood);
    });
  });
});

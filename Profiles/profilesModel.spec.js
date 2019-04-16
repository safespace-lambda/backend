const db = require('../data/config/dbConfig.js');
const Profiles = require('./profilesModel.js');

const completeProfile = {
  user_id: 1,
  name: 'Jonill',
  phone: '12125551212',
  email: 'test@email.com',
  timezone: 'America/New_York',
  picture: 'URL',
  mood: 'Suicidal',
  birthday: '01/01/2000'
};

const incompleteProfile = {
  user_id: 1,
  name: '',
  phone: '',
  email: '',
  timezone: 'America/New_York',
  picture: 'URL',
  mood: 'Suicidal',
  birthday: '01/01/2000'
};

const updatedProfile = {
  user_id: 1,
  name: 'Gilnas',
  phone: '13105550000',
  email: 'westcoast@email.com',
  timezone: 'America/Los_Angeles',
  picture: 'URL',
  mood: 'Happy',
  birthday: '02/02/2002'
};

const incompleteUpdatedProfile = {
  user_id: 1,
  name: '',
  phone: '',
  email: '',
  timezone: '',
  picture: '',
  mood: 'Happy',
  birthday: '02/02/2002'
};

describe('profiles model', () => {
  describe('create', () => {
    beforeEach(async () => {
      await db('profile').truncate();
    });
    it('should insert the profile information provided', async () => {
      await Profiles.add(completeProfile);
      const [profile] = await db('profile');
      expect(profile.email).toBe(completeProfile.email);
      expect(profile.timezone).not.toBeNull();
    });
    it('return null array if required info missing', async () => {
      async function insertProfile() {
        await Profiles.add(incompleteProfile);
      }
      const profile = await db('profile');
      expect(Array.isArray(profile)).toBe(true);
      expect(profile).toHaveLength(0);
      expect(profile).not.toBeNull();
    });
  });
  describe('update', () => {
    beforeEach(async () => {
      await db('profile').truncate();
      await db('profile').insert(completeProfile);
    });
    it('should update the message information provided', async () => {
      await Profiles.update(1, updatedProfile);
      const [profile] = await db('profile');
      expect(profile.id).not.toBeNull();
      expect(profile.name).toBe(updatedProfile.name);
      expect(profile.timezone).toBe(updatedProfile.timezone);
      expect(profile).not.toBeNull();
    });
    it('only update updated info', async () => {
      await Profiles.update(1, incompleteUpdatedProfile);
      const [profile] = await db('profile');
      expect(profile).not.toBeNull();
      expect(profile.mood).toBe(incompleteUpdatedProfile.mood);
    });
  });
  describe('delete()', () => {
    beforeEach(async () => {
      await Profiles.add(completeProfile);
    });
    it('should delete the privided profiles', async () => {
      const numProfiles = await Profiles.remove(1);
      expect(numProfiles).toBe(1);
    });
  });
});

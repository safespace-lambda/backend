const request = require('supertest');
const server = require('./profileRouter');
const db = require('../data/config/dbConfig');
const restricted = require('../middleware/restricted');
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

describe('profileRouter', () => {
  beforeEach(async () => {
    await db('profile').truncate();
  });
  describe('POST/', () => {
    it('endpoint should exist', async () => {
      const response = await request(server).post('/');
      expect(response.status).not.toBe(404);
    });
    it.skip('should return created profile ', async () => {
      const response = await request(server)
        .post('/')

        .send(completeProfile);
      expect(response.body.mood).toBe('Suicidal');
    });
    it.skip('should return 201 status in successful create', async () => {
      const response = await request(server)
        .post('/')
        .send(completeProfile);
      expect(response.status).toBe(201);
      expect(response.status).not.toBe(422);
    });
    it.skip('should return 422 status if user_id is missing', async () => {
      const response = await request(server)
        .post('/')
        .send(incompleteProfile);
      expect(response.status).not.toBe(201);
      expect(response.status).toBe(422);
      expect(response.body.error).toBe('Missing required data');
    });
  });
  describe('GET /', () => {
    it.skip('should respond with 200OK', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.status).not.toBe(500);
      expect(response.status).not.toBeNull();
    });
    describe.skip('Check Array', () => {
      beforeEach(async () => {
        await db('profile').truncate();
      });
      it('should return an array', async () => {
        const response = await request(server).get('/');
        expect(Array.isArray(response.body)).toBe(true);
      });
      it('should return an empty array', async () => {
        const response = await request(server).get('/');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(0);
        expect(response.body).not.toBeNull();
      });
    });
    describe('GET BY ID', () => {
      beforeEach(async () => {
        await db('profile').truncate();
        await db('profile').insert(completeProfile);
      });
      it('should return message with ID 1', async () => {
        const response = await request(server).get('/1');
        expect(response.body).toHaveProperty('name');
        expect(response.status).toBe(200);
      });
      it('should return 404 if message with ID not found', async () => {
        const response = await request(server).get('/100');
        expect(response.body).not.toHaveProperty('timezone');
        expect(response.body).not.toHaveProperty('name');
        expect(response.status).toBe(404);
      });
    });
  });
});

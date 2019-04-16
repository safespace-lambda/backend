const request = require('supertest');
const server = require('./messagesRouter');
const db = require('../data/config/dbConfig');
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
describe('messageRouter', () => {
  describe('POST/', () => {
    it('endpoint should exist', async () => {
      const response = await request(server).post('/');
      expect(response.status).not.toBe(404);
    });
    it('should return created message schedule', async () => {
      const response = await request(server)
        .post('/')
        .send(completeMessage);
      expect(response.body.scheduled).toBe('04/25/2019 10:00:00');
    });
    it('should return 201 status in successful create', async () => {
      const response = await request(server)
        .post('/')
        .send(completeMessage);
      expect(response.status).toBe(201);
      expect(response.status).not.toBe(422);
    });
    it('should return 422 status if user_id is missing', async () => {
      const response = await request(server)
        .post('/')
        .send(incompleteMessage);
      expect(response.status).not.toBe(201);
      expect(response.status).toBe(422);
      expect(response.body.error).toBe('Missing required data');
    });
  });
  describe('GET /', () => {
    it('should respond with 401 if not logged in', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(401);
      expect(response.status).not.toBe(500);
      expect(response.status).not.toBe(200);
      expect(response.status).not.toBeNull();
    });
    describe('GET BY ID', () => {
      beforeEach(async () => {
        await db('messages').truncate();
        await db('messages').insert(completeMessage);
      });
      it('should return message with ID 1', async () => {
        const response = await request(server).get('/1');
        expect(response.body).toHaveProperty('sent');
        expect(response.status).toBe(200);
      });
      it('should return 404 if message with ID not found', async () => {
        const response = await request(server).get('/100');
        expect(response.body).not.toHaveProperty('body');
        expect(response.body).not.toHaveProperty('sent');
        expect(response.status).toBe(404);
      });
    });
  });
  describe('DELETE /', () => {
    beforeEach(async () => {
      await db('messages').truncate();
      await db('messages').insert(completeMessage);
    });
    it('endpoint should exist', async () => {
      const response = await request(server).delete('/1');
      expect(response.status).not.toBe(404);
    });
    it('should return 204', async () => {
      const response = await request(server).delete('/1');
      expect(response.status).toBe(204);
    });
    it('should return 404 if message with ID not found', async () => {
      const response = await request(server).delete('/100');
      expect(response.status).toBe(404);
    });
  });
});

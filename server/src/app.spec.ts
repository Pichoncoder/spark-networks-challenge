
import  request from 'supertest';
import app from './app';

describe('Test root GET', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
    });
})
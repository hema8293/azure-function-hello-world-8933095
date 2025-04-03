const request = require('supertest');
const app = require('../server'); // path to server.js

describe('GET /', () => {
    it('should return Hello, World!', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello, World!');
    });

    it('should return status code 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    it('should return 404 for unknown route', async () => {
        const res = await request(app).get('/unknown');
        expect(res.statusCode).toBe(404);
    });
});

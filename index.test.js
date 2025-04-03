const func = require('./index');

describe('Azure Hello World Function', () => {
  it('should return 200 OK', async () => {
    const context = {};
    const req = {};
    await func(context, req);
    expect(context.res.status).toBe(200);
  });

  it('should return Hello, World!', async () => {
    const context = {};
    const req = {};
    await func(context, req);
    expect(context.res.body).toBe('Hello, World!');
  });

  it('should return a string response', async () => {
    const context = {};
    const req = {};
    await func(context, req);
    expect(typeof context.res.body).toBe('string');
  });
});

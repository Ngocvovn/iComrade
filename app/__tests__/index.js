import request from 'supertest'
import app from '../'

describe('GET /api/posts', () => {
  it('should render properly', async () => {
    await request(app).get('/api/posts?bathrooms=3&bedrooms=3').expect(200);
  });
});
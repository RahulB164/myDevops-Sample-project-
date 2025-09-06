const request = require('supertest');
const app = require('../server');

describe('Product Service', () => {
  test('Health check should return 200', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('healthy');
    expect(response.body.service).toBe('product-service');
  });

  test('GET /api/products should return products list', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/products/:id should return specific product', async () => {
    const response = await request(app)
      .get('/api/products/1')
      .expect(200);
    
    expect(response.body).toHaveProperty('id');
  });

  test('GET /api/products/:id should return 404 for non-existent product', async () => {
    await request(app)
      .get('/api/products/99999')
      .expect(404);
  });
});

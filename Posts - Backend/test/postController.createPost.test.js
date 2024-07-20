const request = require('supertest');
const app = require('../app');
const Post = require('../models/postModel');

jest.mock('../models/postModel');

describe('POST /post', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new post and return 201', async () => {
    const mockPost = { title: 'Test Title', content: 'Test Content' };
    Post.mockImplementation(() => {
      return {
        save: jest.fn().mockResolvedValue(mockPost)
      };
    });

    const response = await request(app)
      .post('/post')
      .send({ title: 'Test Title', content: 'Test Content' });

    expect(response.status).toBe(201);
  });

  it('should return 500 if there is a database error', async () => {
    Post.mockImplementation(() => {
      return {
        save: jest.fn().mockRejectedValue(new Error('Database error'))
      };
    });

    const response = await request(app)
      .post('/post')
      .send({ title: 'Test Title', content: 'Test Content' });

    expect(response.status).toBe(500);
    expect(response.body.messageError).toBe('Database error');
  });
});
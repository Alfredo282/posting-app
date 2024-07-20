const request = require('supertest');
const app = require('../app');
const Post = require('../models/postModel');

jest.mock('../models/postModel');

describe('GET /posts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return posts with status 200', async () => {
    const mockPosts = [{ title: 'Post 1', content: 'Content 1' }, { title: 'Post 2', content: 'Content 2' }];
    Post.find.mockResolvedValue(mockPosts);

    const response = await request(app).get('/posts');

    expect(response.status).toBe(200);
    expect(response.body.posts).toEqual(mockPosts);
  });

  it('should return 500 if there is a database error', async () => {
    Post.find.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/posts');

    expect(response.status).toBe(500);
    expect(response.body.messageError).toBe('Database error');
  });
});
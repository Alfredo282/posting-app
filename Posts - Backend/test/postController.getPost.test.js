const request = require('supertest');
const app = require('../app');
const Post = require('../models/postModel');

jest.mock('../models/postModel');

describe('GET /post/:postId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a post if found', async () => {
    const mockPost = { _id: '1', title: 'Test Title', content: 'Test Content' };

    Post.findById.mockResolvedValue(mockPost);

    const response = await request(app)
      .get('/post/1');

    expect(response.status).toBe(200);
    expect(response.body.post._id).toBe(mockPost._id);
    expect(response.body.post.title).toBe(mockPost.title);
    expect(response.body.post.content).toBe(mockPost.content);
  });

  it('should return 500 if there is a database error', async () => {
    Post.findById.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .get('/post/1');

    expect(response.status).toBe(500);
    expect(response.body.messageError).toBe('Database error');
  });
});
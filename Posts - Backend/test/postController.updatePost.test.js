const request = require('supertest');
const app = require('../app');
const Post = require('../models/postModel');

jest.mock('../models/postModel');

describe('PUT /post/:postId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a post and return status 200', async () => {
    const mockPost = {
      _id: '1',
      title: 'Old Title',
      content: 'Old Content',
      save: jest.fn().mockResolvedValue({
        _id: '1',
        title: 'New Title',
        content: 'New Content'
      })
    };

    Post.findById.mockResolvedValue(mockPost);

    const response = await request(app)
      .put('/post/1')
      .send({ title: 'New Title', content: 'New Content' });

    expect(response.status).toBe(200);
  });

  it('should return 500 if there is a database error', async () => {
    Post.findById.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .put('/post/1')
      .send({ title: 'New Title', content: 'New Content' });

    expect(response.status).toBe(500);
    expect(response.body.messageError).toBe('Database error');
  });
});
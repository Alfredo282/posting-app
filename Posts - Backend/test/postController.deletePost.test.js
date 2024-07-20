const request = require('supertest');
const app = require('../app');
const Post = require('../models/postModel');

jest.mock('../models/postModel');

describe('DELETE /post/:postId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a post and return status 200', async () => {
    const mockPost = { _id: '1', title: 'Test Title', content: 'Test Content' };

    Post.findByIdAndDelete.mockResolvedValue(mockPost);

    const response = await request(app)
      .delete('/post/1')
      .send();

    expect(response.status).toBe(200);
  });

  it('should return 500 if there is a database error', async () => {
    Post.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .delete('/post/1')
      .send();

    expect(response.status).toBe(500);
    expect(response.body.messageError).toBe('Database error');
  });
});
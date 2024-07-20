const Post = require('../models/postModel');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({posts: posts});
    })
    .catch(() => {
      res.status(500).json({messageError: 'Database error'});
    })
}

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const newPost = new Post({
    title: title,
    content: content
  });
  newPost.save()
    .then(result => {
      res.status(201).json({post: newPost});
    })
    .catch(() => {
      res.status(500).json({messageError: 'Database error'});
    });
}

exports.getPost = (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .then(post => {
      res.status(200).json({post: post});
    })
    .catch(() => {
      res.status(500).json({messageError: 'Database error'});
    });
}

exports.updatePost = (req, res, next) => {
  const id = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  Post.findById(id)
    .then(post => {
      post.title = title;
      post.content = content;
      return post.save();
    })
    .then(updatePost => {
      res.status(200).json({post: updatePost});
    })
    .catch(() => {
      res.status(500).json({messageError: 'Database error'});
    });
}

exports.deletePost = (req, res, next) => {
  const id = req.params.postId;
  Post.findByIdAndDelete(id)
    .then(post => {
      res.status(200).json({post: post});
    })
    .catch(() => {
      res.status(500).json({messageError: 'Database error'});
    });
}
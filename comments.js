//Create Web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var mongoose = require('mongoose');

// Get All comments
router.get('/', function(req, res, next) {
  Comment.find({}, function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// Get comments by post id
router.get('/:postId', function(req, res, next) {
  Comment.find({postId: req.params.postId}, function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// Create comment
router.post('/', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, post) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

// Update comment
router.put('/:commentId', function(req, res, next) {
  Comment.findByIdAndUpdate(req.params.commentId, req.body, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

// Delete comment
router.delete('/:commentId', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.commentId, req.body, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

module.exports = router;
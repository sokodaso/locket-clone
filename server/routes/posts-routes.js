const express = require('express');
const { getPosts, deletePost, updatePost, createdPost } = require('../controllers/posts-controller');
const router = express.Router();


//GET api/posts
router.get('/', getPosts);

//POST api/posts
router.post('/', createdPost);

//UPDATE api/posts/:pid
router.patch('/:pid', updatePost);

//DELETE api/posts/:pid
router.delete('/:pid', deletePost);

module.exports = router;
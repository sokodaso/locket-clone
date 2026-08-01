const express = require('express');
const { getPostsByUserId, deletePost, updatePost, createPost } = require('../controllers/posts-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const {fileUpload} = require('../middleware/file-upload');

router.use(checkAuth);

//GET api/posts/:uid
router.get('/:uid', getPostsByUserId);

//POST api/posts
router.post('/', fileUpload.single('image'), createPost);

//UPDATE api/posts/:pid
router.patch('/:pid', updatePost);

//DELETE api/posts/:pid
router.delete('/:pid', deletePost);

module.exports = router;
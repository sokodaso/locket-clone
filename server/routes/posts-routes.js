const express = require('express');
const { getPostsByUserId, deletePost, updatePost, createPost } = require('../controllers/posts-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const {fileUpload} = require('../middleware/file-upload');

router.use(checkAuth);

//GET api/posts/:uid
router.get('/:uid', getPostsByUserId);

//POST api/posts
router.post('/',(req, res, next)=>{
    
    fileUpload.single('image')(req, res, (err)=>{
        if(err){
            console.error('Error uploading file:', err);
            return res.status(500).json({ message: 'Error uploading file' });
        }
        next();
    });
}, createPost);

//UPDATE api/posts/:pid
router.patch('/:pid', updatePost);

//DELETE api/posts/:pid
router.delete('/:pid', deletePost);

module.exports = router;
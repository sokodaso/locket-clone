
const HttpsError = require('../models/http-error');
const prisma = require('../prisma');

const createdPost = async (req, res, next) => {
    console.log('Creating a new post');
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
        return res.status(422).json({ message: 'Invalid input, missing field' });
    }
   let newPost;
    try{
         newPost = await prisma.post.create({
            data:{ title, content, author : { connect: { id: parseInt(authorId) } } }
        });

    }catch(err){
        console.error(err);
        const error = new HttpsError('Creating post failed, please try again.',500);
        return next(error);
    }
   
    res.status(201).json({ message: 'Post created', post: createdPost });
};

const getPostsByUserId = async (req, res, next) => {
    console.log('Fetching a single post');
    const userId = req.params.uid;
    
    let posts;
    try{
        posts = await prisma.post.findMany({
            where: { authorId : parseInt(userId) }
        });
    }catch(err){
        console.error(err);
        const error = new HttpsError('Fetching post failed, please try again.',500);
        return next(error);
    }

    if(!posts || posts.length === 0){
        const error = new HttpsError('Could not find post for the provided id.',404);
        return next(error);
    }
    res.status(200).json({ message: 'Post fetched', posts });
};

const updatePost = (req, res, next) => {
    console.log('Updating a post');
    const postId = req.params.pid;
    const { title, content } = req.body;

    const postIndex = DUMMY_POSTS.findIndex(p => p.id === postId);
    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    if (title) DUMMY_POSTS[postIndex].title = title;
    if (content) DUMMY_POSTS[postIndex].content = content;

    res.json({ message: 'Post updated', post: DUMMY_POSTS[postIndex] });
};

const deletePost = (req, res, next) => {
    console.log('Deleting a post');
    const postId = req.params.pid;

    const postIndex = DUMMY_POSTS.findIndex(p => p.id === postId);
    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    DUMMY_POSTS.splice(postIndex, 1);
    res.json({ message: 'Post deleted' });
};

exports.getPostsByUserId = getPostsByUserId;
exports.createdPost = createdPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;

const HttpsError = require('../models/http-error');
const prisma = require('../prisma');

const createPost = async (req, res, next) => {
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
   
    res.status(201).json({ message: 'Post created', post: newPost });
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
    res.status(200).json({ message: 'Post fetched', posts});
};

const updatePost = async (req, res, next) => {
    console.log('Updating a post');
    const postId = req.params.pid;
    const { title, content } = req.body;

    let post;
    try{
        post = await prisma.post.findFirst({
            where: { id: parseInt(postId) }
        });
    }catch(err){
        console.error(err);
        const error = new HttpsError('Something went wrong, could not update post.',500);
        return next(error);
    }

    if(!post){
        const error = new HttpsError('Could not find post for the provided id.',404);
        return next(error);
    }

    try{
        post = await prisma.post.update({
            where: { id: parseInt(postId) },
            data: { title, content }
        });
    }catch(err){
        console.error(err);
        const error = new HttpsError('Something went wrong, could not update post.',500);
        return next(error);
    }

    res.status(200).json({ message: 'Post updated', post });
};

const deletePost = async (req, res, next) => {
    console.log('Deleting a post');
    const postId = req.params.pid;

    let post;
    // Check if post exists
    try{
        post = await prisma.post.findFirst({
            where: { id: parseInt(postId) }
        });
    }catch(err){
        console.error(err);
        const error = new HttpsError('Something went wrong, could not delete post.',500);
        return next(error);
    }
    // If no post found
    if(!post){
        const error = new HttpsError('Could not find post for the provided id.',404);
        return next(error);
    } 
    // Delete the post
    try{
        await prisma.post.delete({
            where: { id: parseInt(postId) }
        });
    }catch(err){
        console.error(err);
        const error = new HttpsError('Something went wrong, could not delete post.',500);
        return next(error);
    }

    res.status(200).json({ message: 'Post deleted' });
};

exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
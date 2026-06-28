const HttpsError = require('../models/http-error');
const prisma = require('../prisma');

const createPost = async (req, res, next) => {
    console.log('Creating a new post');
    const { title, content } = req.body;
    const authorId = req.userData.userId;

    // Validate input
    if (!title || !content) {
        return res.status(422).json({ message: 'Invalid input, missing field' });
    }

    // Create new post  
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
    console.log('Fetching  posts');
    const userId = req.params.uid;
    
    let user;
    try {
        user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

        if(!user){
            const error = new HttpsError('Could not find user for the provided id.',404);
            return next(error);
        }

    }catch(err){
        console.error(err);
        const error = new HttpsError('Something went wrong, could not fetch posts.',500);
        return next(error);
    }

    let posts;
    try{
        posts = await prisma.post.findMany({
            where: { authorId : parseInt(userId) }
        });
        
        if(!posts){
            const error = new HttpsError('Could not find post for the provided id.',404);
            return next(error);
        }
    }catch(err){
        console.error(err);
        const error = new HttpsError('Fetching post failed, please try again.',500);
        return next(error);
    }
  
    res.status(200).json({ message: 'Post fetched', posts});
};

const updatePost = async (req, res, next) => {
    console.log('Updating a post');
    const postId = req.params.pid;
    const creatorId = req.userData.userId;
    const { title, content } = req.body;
    
    // Check if post exists
    let post;
    try{
        post = await prisma.post.findFirst({
            where: { id: parseInt(postId) }
        });

        if(!post){
        const error = new HttpsError('Could not find post for the provided id.',404);
        return next(error);
    }
    }catch(err){
        console.error(err);
        const error = new HttpsError('Something went wrong, could not update post.',500);
        return next(error);
    }
    
    // Check if the user is the owner of the post
    if(post.authorId !== parseInt(creatorId)){
        const error = new HttpsError('You are not the owner of this post.',403);
        return next(error);
    }

    // Update the post
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
    const creatorId = req.userData.userId;

    let post;
    // Check if post exists
    try{
        post = await prisma.post.findFirst({
            where: { id: parseInt(postId) }
        });

        // If no post found
        if(!post){
            const error = new HttpsError('Could not find post for the provided id.',404);
            return next(error);
        } 
    }catch(err){
        console.error(err);
        const error = new HttpsError('Something went wrong, could not delete post.',500);
        return next(error);
    }
    
    // Check if the user is the owner of the post
    if(post.authorId !== parseInt(creatorId)){
        const error = new HttpsError('You are not the owner of this post.',403);
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
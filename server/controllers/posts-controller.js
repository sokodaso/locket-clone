DUMMY_POSTS = [
    { id: 'p1', title: 'First Post', content: 'This is the content of the first post.' },
    { id: 'p2', title: 'Second Post', content: 'This is the content of the second post.' }
];

const HttpsError = require('../models/http-error');

const getPosts = (req, res, next) => {
    console.log('Fetching all posts');
    res.json({ message: DUMMY_POSTS })
    
};


const getPostById = (req, res, next) => {
    console.log('Fetching a single post');
    const postId = req.params.pid;
    const post = DUMMY_POSTS.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
};

const createdPost = (req, res, next) => {
    console.log('Creating a new post');
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(422).json({ message: 'Invalid input, missing field' });
    }

    const createdPost = {
        id: Math.random().toString(),
        title,
        content
    };

    DUMMY_POSTS.push(createdPost);
    res.status(201).json({ message: 'Post created', post: createdPost });
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

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createdPost = createdPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
const express = require('express');

const app = express();

app.use(express.json());

//Importing routes
const usersRoutes = require('./routes/users-routes');
const postsRoutes = require('./routes/posts-routes');

const HttpsError = require('./models/http-error');
//Using routes
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

app.use((req,res,next) => {
    const error = new HttpsError('Could not find this route.', 404);
    throw error;
});

//Error handling middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(3000);
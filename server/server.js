import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoute from './routes/admin.route.js';
import authRoute from './routes/auth.route.js';
import categoriesRoute from './routes/categories.route.js';
import commentsRoute from './routes/comments.route.js';
import postsRoute from './routes/posts.route.js';

const PORT = 5000 || process.env.PORT;

const server = express();

// Add middlewares
server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


server.use('/admin', adminRoute);
server.use('/auth', authRoute);
server.use('/categories', categoriesRoute);
server.use('/', commentsRoute);
server.use('/posts', postsRoute);


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

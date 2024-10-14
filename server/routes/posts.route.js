import express from 'express';
import { getPosts, getPost, createPost, editPost, deletePost, getPostBy } from '../controllers/posts.controller.js';
import { verifyUserToken } from '../middlewares/verifyToken.js'

const router = express.Router();

router.get('/', getPosts);  // Get all posts (with pagination)
router.get('/:slug/', getPost);  // Get a specific post by ID
router.get('/post/getBy/', getPostBy); // Edit a post (authenticated, author-only)
router.post('/', verifyUserToken, createPost);  // Create a new post (authenticated)
router.put('/:slug/', verifyUserToken, editPost);  // Edit a post (authenticated, author-only)
router.delete('/:slug/', verifyUserToken, deletePost);  // Delete a post (authenticated, author-only)

export default router;

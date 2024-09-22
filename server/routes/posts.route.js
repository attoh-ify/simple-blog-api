import express from 'express';
import { getPosts, getPost, createPost, editPost, deletePost } from '../controllers/posts.controller.js';

const router = express.Router();

router.get('/', getPosts);  // Get all posts (with pagination)
router.get('/:id/', getPost);  // Get a specific post by ID
router.post('/', createPost);  // Create a new post (authenticated)
router.put('/:id/', editPost);  // Edit a post (authenticated, author-only)
router.delete('/:id/', deletePost);  // Delete a post (authenticated, author-only)

export default router;

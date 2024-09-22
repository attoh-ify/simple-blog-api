import express from 'express';
import { getComments, addComment, editComment, deleteComment } from '../controllers/comments.controller.js';

const router = express.Router();

router.get('/posts/:id/comments/', getComments);  // Get all comments for a post
router.post('/posts/:id/comments/', addComment);  // Add a comment to a post (authenticated)
router.put('/posts/:id/comments/:commentId/', editComment);  // Edit a comment (authenticated, author-only)
router.delete('/posts/:id/comments/:commentId/', deleteComment);  // Delete a comment (authenticated, author-only)

export default router;

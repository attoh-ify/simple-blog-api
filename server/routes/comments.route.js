import express from 'express';
import { getComments, addComment, deleteComment } from '../controllers/comments.controller.js';
import { verifyUserToken } from '../middlewares/verifyToken.js'

const router = express.Router();

router.get('/posts/:postSlug/comments/', getComments);  // Get all comments for a post
router.post('/posts/:postSlug/comment/', verifyUserToken, addComment);  // Add a comment to a post (authenticated)
router.delete('/posts/:postSlug/comments/:commentID/', verifyUserToken, deleteComment);  // Delete a comment (authenticated, author-only)

export default router;

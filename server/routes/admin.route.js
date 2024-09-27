import express from 'express';
import { getUsers, getUser, deleteUser } from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/users/', verifyAdminToken, getUsers);  // List all users (admin-only)
router.get('/users/user/', verifyAdminToken, getUser);  // Get a user (admin-only)
router.delete('/users/delete/', verifyAdminToken, deleteUser);  // Delete a user (admin-only)

export default router;

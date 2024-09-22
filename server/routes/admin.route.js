import express from 'express';
import { getUsers, getUser, deleteUser } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/users/', getUsers);  // List all users (admin-only)
router.get('/users/:id', getUser);  // Get a user (admin-only)
router.delete('/users/delete/:id', deleteUser);  // Delete a user (admin-only)

export default router;

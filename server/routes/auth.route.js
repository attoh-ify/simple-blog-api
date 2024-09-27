import express from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth.controller.js';
import { verifyUserToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register/', register);  // Register a new user
router.post('/login/', login);  // Log in a user
router.post('/logout/', verifyUserToken, logout);  // Log out a user
router.get('/profile/', verifyUserToken, getProfile);  // Get the logged-in user's profile
router.put('/profile/', verifyUserToken, updateProfile);  // Update user's profile

export default router;

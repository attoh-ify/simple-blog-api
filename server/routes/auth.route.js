import express from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register/', register);  // Register a new user
router.post('/login/', login);  // Log in a user
router.post('/logout/', logout);  // Log out a user
router.get('/profile/', getProfile);  // Get the logged-in user's profile
router.put('/profile/', updateProfile);  // Update user's profile

export default router;

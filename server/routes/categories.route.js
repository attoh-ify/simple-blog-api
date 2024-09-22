import express from 'express';
import { getCategories, addCategory } from '../controllers/categories.controller.js';

const router = express.Router();

router.get('/', getCategories);  // Get all categories/tags
router.post('/', addCategory);  // Add a new category/tag (authenticated, admin-only)

export default router;

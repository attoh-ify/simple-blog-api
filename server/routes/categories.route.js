import express from 'express';
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory } from '../controllers/categories.controller.js';
import { verifyAdminToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', getCategories);  // Get all categories/tags
router.get('/:slug', getCategory);  // Get category
router.post('/', verifyAdminToken, addCategory);  // Add a new category/tag (admin-only)
router.put('/edit/:slug', verifyAdminToken, updateCategory);  // Edit category (admin-only)
router.delete('/delete/:slug', verifyAdminToken, deleteCategory);  // delete category (admin-only)

export default router;

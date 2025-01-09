// CategoryRouter
import express from 'express';
import { createCategory, getAllCategories, updateCategory, deleteCategory , getCategoryById} from '../controllers/category.controller';

const CategoryRouter = express.Router();

// Create a new category
CategoryRouter.post('/categories', createCategory);

// Get all categories
CategoryRouter.get('/categories', getAllCategories);

CategoryRouter.get('/categories/:id', getCategoryById);
// Update a category by ID
CategoryRouter.put('/categories/:id', updateCategory);

// Delete a category by ID
CategoryRouter.delete('/categories/:id', deleteCategory);

export default CategoryRouter;

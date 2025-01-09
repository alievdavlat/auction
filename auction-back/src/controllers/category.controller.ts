import { Request, Response } from 'express';
import { Category, SubCategory } from '../models';

// Category yaratish (Create)
export const createCategory = async (req: Request, res: Response):Promise<any> => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating category' });
  }
};

// Barcha categorylarni ko'rish (Read all)
export const getAllCategories = async (req: Request, res: Response):Promise<any> => {
  try {
    const categories = await Category.findAll({
      include: {
        model: SubCategory,
        as: 'subcategories',
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving categories' });
  }
};



// Faqat bitta categoryni ko'rish (Read single)
export const getCategoryById = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id, {
      include: {
        model: SubCategory,
        as: 'subcategories',
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving category' });
  }
};

// Categoryni yangilash (Update)
export const updateCategory = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.name = name || category.name;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating category' });
  }
};

// Categoryni o'chirish (Delete)
export const deleteCategory = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting category' });
  }
};

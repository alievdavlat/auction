import { Request, Response } from 'express';
import { Category, SubCategory } from '../models';

// SubCategory yaratish (Create)
export const createSubCategory = async (req: Request, res: Response):Promise<any> => {
  const { name, categoryId } = req.body;
  try {
    const subCategory = await SubCategory.create({ name, categoryId });
    res.status(201).json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating subcategory' });
  }
};

// Barcha subcategorylarni ko'rish (Read all)
export const getAllSubCategories = async (req: Request, res: Response):Promise<any> => {
  try {
    const subCategories = await SubCategory.findAll({
      include: {
        model: Category,
        as: 'category',
      },
    });
    res.status(200).json(subCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving subcategories' });
  }
};

// Faqat bitta subcategoryni ko'rish (Read single)
export const getSubCategoryById = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategory.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
      },
    });
    if (subCategory) {
      res.status(200).json(subCategory);
    } else {
      res.status(404).json({ message: 'SubCategory not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving subcategory' });
  }
};

// Get SubCategories by Category ID
export const getSubCategoriesByCategoryId = async (req: Request, res: Response): Promise<any> => {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  try {
    const subCategories = await SubCategory.findAll({
      where: { categoryId },
      include: {
        model: Category,
        as: 'category',
      },
    });

    if (subCategories.length > 0) {
      res.status(200).json(subCategories);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(`Error retrieving subcategories: ${error.message}`);
    res.status(500).json({ message: 'Error retrieving subcategories' });
  }
};


// SubCategoryni yangilash (Update)
export const updateSubCategory = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  try {
    const subCategory = await SubCategory.findByPk(id);
    if (subCategory) {
      subCategory.name = name || subCategory.name;
      subCategory.categoryId = categoryId || subCategory.categoryId;
      await subCategory.save();
      res.status(200).json(subCategory);
    } else {
      res.status(404).json({ message: 'SubCategory not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating subcategory' });
  }
};

// SubCategoryni o'chirish (Delete)
export const deleteSubCategory = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategory.findByPk(id);
    if (subCategory) {
      await subCategory.destroy();
      res.status(200).json({ message: 'SubCategory deleted successfully' });
    } else {
      res.status(404).json({ message: 'SubCategory not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting subcategory' });
  }
};

import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Bid, Category, Participant, Product, SubCategory, User } from '../models';

// Create product
export const createProduct = async (req: Request, res: Response): Promise<any> => {
  const { title, description, image, video, startingBid, categoryId } = req.body;
  try {
    const newProduct = await Product.create({...req.body});
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, description, image, video, startingBid, categoryId } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    await product.update({
      title: title || product.title,
      description: description || product.description,
      image: image || product.image,
      video: video || product.video,
      startingBid: startingBid || product.startingBid,
      categoryId: categoryId || product.categoryId,
    });
    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    await product.destroy();
    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message,
    });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        {
          model: Participant, 
          as: 'participants',
          include: [{ model: User, as: 'user' }],
        },
        { model: Bid, as: 'bids', include: [{ model: User, as: 'user' }] },
      ],
    });
    
    console.log(JSON.stringify(product, null, 2));  // Log the product for debugging
    
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving product',
      error: error.message,
    });
  }
};




// Get all products with search, pagination, and filter
export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  const { page = 1, limit = 10, search = '', categoryId = '', subCategoryId = '' } = req.query;
  const whereCondition: any = {};

  if (search) {
    whereCondition.title = {
      [Op.iLike]: `%${search}%`,
    };
  }
  if (categoryId) whereCondition.categoryId = categoryId;
  if (subCategoryId) whereCondition.subCategoryId = subCategoryId;

  try {
    const pageNum = Math.max(Number(page), 1);
    const pageSize = Math.min(Number(limit), 100);

    const products = await Product.findAndCountAll({
      where: whereCondition,
      include: [
        { model: Category, as: 'category' },
        { model: Participant, as: 'participants', include: [{ model: User, as: 'user' }] },
        { model: Bid, as: 'bids', include: [{ model: User, as: 'user' }] },
      ],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
    });

    res.status(200).json({
      message: 'Products retrieved successfully',
      products: products.rows,
      totalCount: products.count,
      totalPages: Math.ceil(products.count / pageSize),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving products',
      error: error.message,
    });
  }
};

// Get products by search term
export const getProductsBySearch = async (req: Request, res: Response): Promise<any> => {
  const { search = '' } = req.query;

  try {
    const products = await Product.findAll({
      where: {
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
      include: [
        { model: Category, as: 'category' },
        { model: Participant, as: 'participants', include: [{ model: User, as: 'user' }] },
        { model: Bid, as: 'bids', include: [{ model: User, as: 'user' }] },
      ],
    });

    res.status(200).json({
      message: 'Products retrieved by search successfully',
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving products',
      error: error.message,
    });
  }
};

// Get products with filter and pagination
export const getProductsWithFilterAndPagination = async (req: Request, res: Response): Promise<any> => {
  const { page = 1, limit = 10, categoryId = '', subCategoryId = '' } = req.query;

  // Filtrlash shartlarini tayyorlash
  const whereCondition: any = {};

  if (categoryId) {
    whereCondition.categoryId = categoryId;
  }

  if (subCategoryId) {
    whereCondition.subCategoryId = subCategoryId;
  }

  try {
    // Agar hech qanday filtr parametrlaridan biri ham yuborilmagan bo'lsa, barcha mahsulotlarni olish
    const products = await Product.findAndCountAll({
      where: whereCondition,
      include: [
        { model: Category, as: 'category' },
        { model: SubCategory, as: 'subCategory' },
        { model: Participant, as: 'participants', include: [{ model: User, as: 'user' }] },
        { model: Bid, as: 'bids', include: [{ model: User, as: 'user' }] },
      ],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });

    // Agar mahsulotlar topilmasa, bo'sh array qaytarish
    if (products.count === 0) {
      res.status(200).json({
        message: 'Berilgan filtrlar bo\'yicha mahsulotlar topilmadi',
        products: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: Number(page),
      });
    } else {
      res.status(200).json({
        message: 'Mahsulotlar muvaffaqiyatli olindi',
        products: products.rows,
        totalCount: products.count,
        totalPages: Math.ceil(products.count / Number(limit)),
        currentPage: Number(page),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Mahsulotlarni olishda xatolik yuz berdi',
      error: error.message,
    });
  }
};



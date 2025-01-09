import express from "express";
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByCategoryId,
} from "../controllers/subCategory.Controller";

const SubCategoryROuter = express.Router();

// SubCategory yaratish
SubCategoryROuter.post("/create-subcategory", createSubCategory);

// Barcha subcategorylarni olish
SubCategoryROuter.get("/subcategories", getAllSubCategories);

// Faqat bitta subcategoryni olish
SubCategoryROuter.get("/subcategoy/:id", getSubCategoryById);

SubCategoryROuter.get('/subcategories/:categoryId', getSubCategoriesByCategoryId);
// SubCategoryni yangilash
SubCategoryROuter.put("/update-subcategory/:id", updateSubCategory);

// SubCategoryni o'chirish
SubCategoryROuter.delete("/delete-subcategory/:id", deleteSubCategory);

export default SubCategoryROuter;

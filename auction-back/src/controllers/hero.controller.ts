import { Request, Response } from "express";
import {HeroSlider} from "../models";
import path from "path";

// Hero yaratish
export const createHero = async (req: Request, res: Response): Promise<any> => {
  try {
    const imagePath = req?.file.filename

    if (!imagePath) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const newHero = await HeroSlider.create({
      image: path.join("/", imagePath),
    });

    res.status(201).json({
      message: "Hero created successfully",
      hero: newHero,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating hero",
      error: error.message,
    });
  }
};

// Barcha herolarni olish
export const getAllHeroes = async (req: Request, res: Response): Promise<any> => {
  try {
    const heroes = await HeroSlider.findAll();

    res.status(200).json({
      message: "Heroes retrieved successfully",
      heroes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving heroes",
      error: error.message,
    });
  }
};

// Hero ni ID orqali olish
export const getHeroById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const hero = await HeroSlider.findByPk(id);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json({
      message: "Hero retrieved successfully",
      hero,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving hero",
      error: error.message,
    });
  }
};

// Hero ni o'chirish
export const deleteHero = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const hero = await HeroSlider.findByPk(id);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    await hero.destroy();
    res.status(200).json({ message: "Hero deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting hero",
      error: error.message,
    });
  }
};

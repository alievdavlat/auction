import { Request, Response } from 'express';
import { Features } from '../models';

// Features yaratish (Create)
export const createFeature = async (req: Request, res: Response):Promise<any> => {
  const { title, description } = req.body;
  try {
    const feature = await Features.create({ title, description });
    res.status(201).json(feature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating feature' });
  }
};

// Barcha featuresni ko'rish (Read all)
export const getAllFeatures = async (req: Request, res: Response):Promise<any> => {
  try {
    const features = await Features.findAll();
    res.status(200).json(features);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving features' });
  }
};

// Faqat bitta feature-ni ko'rish (Read single)
export const getFeatureById = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  try {
    const feature = await Features.findByPk(id);
    if (feature) {
      res.status(200).json(feature);
    } else {
      res.status(404).json({ message: 'Feature not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving feature' });
  }
};

// Feature-ni yangilash (Update)
export const updateFeature = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const feature = await Features.findByPk(id);
    if (feature) {
      feature.title = title || feature.title;
      feature.description = description || feature.description;
      await feature.save();
      res.status(200).json(feature);
    } else {
      res.status(404).json({ message: 'Feature not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating feature' });
  }
};

// Feature-ni o'chirish (Delete)
export const deleteFeature = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  try {
    const feature = await Features.findByPk(id);
    if (feature) {
      await feature.destroy();
      res.status(200).json({ message: 'Feature deleted successfully' });
    } else {
      res.status(404).json({ message: 'Feature not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting feature' });
  }
};

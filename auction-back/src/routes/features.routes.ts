import express from 'express';
import {
  createFeature,
  getAllFeatures,
  getFeatureById,
  updateFeature,
  deleteFeature
} from '../controllers/features.controller';

const FeaturesRouter = express.Router();

FeaturesRouter.post('/features', createFeature);
FeaturesRouter.get('/features', getAllFeatures);
FeaturesRouter.get('/features/:id', getFeatureById);
FeaturesRouter.put('/features/:id', updateFeature);
FeaturesRouter.delete('/features/:id', deleteFeature);

export default FeaturesRouter;

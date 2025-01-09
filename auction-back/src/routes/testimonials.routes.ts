import { Router } from 'express';
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonials.controller';

const testimonialsRouter = Router();

// CRUD routes
testimonialsRouter.post('/testimonials', createTestimonial);
testimonialsRouter.get('/testimonials', getAllTestimonials);
testimonialsRouter.get('/testimonials/:id', getTestimonialById);
testimonialsRouter.put('/testimonials/:id', updateTestimonial);
testimonialsRouter.delete('/testimonials/:id', deleteTestimonial);

export default testimonialsRouter;

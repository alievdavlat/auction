// import { Request, Response } from 'express';
// import { Testimonial } from '../models';
// import { User } from '../models'; // Import the User model

// // Create Testimonial
// export const createTestimonial = async (req: Request, res: Response): Promise<any> => {
//   const { message, job } = req.body;
//   try {
//     const newTestimonial = await Testimonial.create({ message, job });
//     res.status(201).json({ message: 'Testimonial created successfully', testimonial: newTestimonial });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating testimonial', error: error.message });
//   }
// };

// // Get all Testimonials (with associated User data)
// export const getAllTestimonials = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const testimonials = await Testimonial.findAll({
//       include: {
//         model: User,
//         as: 'user', // Alias for the User association
//         attributes: ['id', 'username'], // You can customize which fields to return
//       },
//     });
//     res.status(200).json({ testimonials });
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving testimonials', error: error.message });
//   }
// };

// // Get a single Testimonial by ID
// export const getTestimonialById = async (req: Request, res: Response): Promise<any> => {
//   const { id } = req.params;
//   try {
//     const testimonial = await Testimonial.findByPk(id, {
//       include: {
//         model: User,
//         as: 'user',
//         attributes: ['id', 'name', 'email'],
//       },
//     });
//     if (!testimonial) {
//       res.status(404).json({ message: 'Testimonial not found' });
//     } else {
//       res.status(200).json({ testimonial });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving testimonial', error: error.message });
//   }
// };

// // Update a Testimonial
// export const updateTestimonial = async (req: Request, res: Response): Promise<any> => {
//   const { id } = req.params;
//   const { message, job } = req.body;
//   try {
//     const testimonial = await Testimonial.findByPk(id);
//     if (!testimonial) {
//       return res.status(404).json({ message: 'Testimonial not found' });
//     }
//     await testimonial.update({ message, job });
//     res.status(200).json({ message: 'Testimonial updated successfully', testimonial });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating testimonial', error: error.message });
//   }
// };

// // Delete a Testimonial
// export const deleteTestimonial = async (req: Request, res: Response): Promise<any> => {
//   const { id } = req.params;
//   try {
//     const testimonial = await Testimonial.findByPk(id);
//     if (!testimonial) {
//       return res.status(404).json({ message: 'Testimonial not found' });
//     }
//     await testimonial.destroy();
//     res.status(200).json({ message: 'Testimonial deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
//   }
// };

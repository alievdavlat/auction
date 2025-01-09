// import { DataTypes, Model, Optional } from 'sequelize';
// import { sequelize } from '../config/sequalize.config';

// // Define interface for Testimonial creation (without id since it's auto-generated)
// interface TestimonialAttributes {
//   id: number;
//   message: string;
//   job: string;
// }

// // Define interface for the optional attributes (for creation/updating)
// interface TestimonialCreationAttributes extends Optional<TestimonialAttributes, 'id'> {}

// export class Testimonial extends Model<TestimonialAttributes, TestimonialCreationAttributes> implements TestimonialAttributes {
//   public id!: number;
//   public message!: string;
//   public job!: string;

//   // Timestamps will be automatically handled by Sequelize
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// // Initialize the model
// Testimonial.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     message: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     job: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
   
//   },
//   {
//     sequelize,
//     modelName: 'Testimonial',
//     tableName: 'testimonials',
//   }
// );

// // Define the association inside a function to avoid circular dependency


// export default Testimonial;

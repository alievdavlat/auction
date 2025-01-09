import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequalize.config'; // Sequelize instansiyasi
import { SubCategory } from './subCategory.model'; // Bog'liq model

// Category atributlari uchun interfeys
interface CategoryAttributes {
  id: string;
  name: string;
}

// Yaratishda faqat `id` optional bo'lishi uchun interfeys
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

// Category modeli
export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Category modelini aniqlash
Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
  }
);



import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequalize.config'; // Sequelize instansiyasi
import { Category } from './categories.model'; // Bog'liq model

// SubCategory atributlari uchun interfeys
interface SubCategoryAttributes {
  id: string;
  name: string;
  categoryId: string;
}

// Yaratishda faqat `id` optional bo'lishi uchun interfeys
interface SubCategoryCreationAttributes extends Optional<SubCategoryAttributes, 'id'> {}

// SubCategory modeli
export class SubCategory
  extends Model<SubCategoryAttributes, SubCategoryCreationAttributes>
  implements SubCategoryAttributes
{
  public id!: string;
  public name!: string;
  public categoryId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// SubCategory modelini aniqlash
SubCategory.init(
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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'subcategories',
    timestamps: true,
  }
);

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequalize.config"; // Sequelize instansiyasi

// Product atributlari uchun interfeys
interface ProductAttributes {
  id: string;
  title: string;
  description?: string;
  image?: string;
  video?: string;
  startingBid: number;
  categoryId: string;
  subCategoryId: string;
  artistName: string;
  year: string;
  medium: string;
  frame: string;
  length: string;
  height: string;
  material: string;
  imageType: string;
  weight: string;
  lotNumber:string;
}

// Yaratishda faqat id optional bo'lishi uchun interfeys
interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    "id" | "description" | "image" | "video"
  > {}

// Product modeli
export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public title!: string;
  public description?: string;
  public image?: string;
  public video?: string;
  public startingBid!: number;
  public categoryId!: string;
  public subCategoryId!: string;

  public artistName: string;
  public year: string;
  public length: string;
  public height: string;

  public medium: string;
  public frame: string;
  public weight: string;
  public material: string;
  public imageType: string;
  public lotNumber : string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Product modelini aniqlash
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    artistName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    medium: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    frame: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    length: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    imageType: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    lotNumber: {
      type: DataTypes.STRING(8), 
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    video: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    startingBid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subCategoryId: {
      // Add this field
      type: DataTypes.UUID,
      allowNull: true, // Set to false if it's required
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
  }
);
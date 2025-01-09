import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequalize.config'; // Sequelize instansiyasi

// User atributlari uchun interfeys
export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  avatar?: string; // avatar rasm, optional
  role: string;
  fullname: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Yaratishda faqat `id` optional bo'lishi uchun interfeys
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'fullname' | 'avatar' | 'createdAt' | 'updatedAt'> {}

// User modeli
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public password!: string;
  public avatar?: string;
  public role!: string;
  public fullname!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// User modelini aniqlash
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true, // Optional avatar rasm
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // `createdAt` va `updatedAt` avtomatik qo'shiladi
  }
);

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequalize.config'; // Sequelize instansiyasi
import { Product } from './product.model'; // Bog'liq model
import { User } from './user.model'; // Bog'liq model

// Bid atributlari uchun interfeys
interface BidAttributes {
  id: string;
  value: number;
  senderId: string;
  senderUsername: string;
  productId: string;
  createdAt?: Date;
}

// Yaratishda faqat `id` optional bo'lishi uchun interfeys
interface BidCreationAttributes extends Optional<BidAttributes, 'id' | 'createdAt'> {}

// Bid modeli
export class Bid
  extends Model<BidAttributes, BidCreationAttributes>
  implements BidAttributes
{
  public id!: string;
  public value!: number;
  public senderId!: string;
  public senderUsername!: string;
  public productId!: string;
  public participantId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Bid modelini aniqlash
Bid.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    senderUsername: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  
  },
  {
    sequelize,
    tableName: 'bids',
    timestamps: true,
  }
);


import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequalize.config'; // Sequelize instansiyasi
import { Product } from './product.model'; // Bog'liq model
import { User } from './user.model'; // Bog'liq model

// Participant atributlari uchun interfeys
interface ParticipantAttributes {
  id: string;
  productId: string;
  userId: string;
}

// Yaratishda faqat `id` optional bo'lishi uchun interfeys
interface ParticipantCreationAttributes extends Optional<ParticipantAttributes, 'id'> {}

// Participant modeli
export class Participant
  extends Model<ParticipantAttributes, ParticipantCreationAttributes>
  implements ParticipantAttributes
{
  public id!: string;
  public productId!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Participant modelini aniqlash
Participant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'participants',
    timestamps: true,
  }
);



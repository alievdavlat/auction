import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequalize.config'; // Sequelize instance

// Features model definition
export class Features extends Model {
  public id!: string;
  public title!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Features.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'features',
    timestamps: true,
  }
);

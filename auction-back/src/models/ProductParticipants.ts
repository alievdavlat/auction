// ProductParticipants model
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequalize.config';

export class ProductParticipants extends Model {}

ProductParticipants.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products', // Assuming your product table is named 'Products'
        key: 'id',
      },
    },
    participantId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Participants', // Assuming your participants table is named 'Participants'
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'ProductParticipants',
    tableName: 'ProductParticipants',
    timestamps: false, // if no timestamps are used in the table
  }
);

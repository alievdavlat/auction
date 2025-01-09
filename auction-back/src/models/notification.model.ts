import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/sequalize.config";

interface NotificationAttributes {
  id: string;
  title: string;
  message: string;
  status: "read" | "unread";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Notification
  extends Model<NotificationAttributes>
  implements NotificationAttributes
{
  public id!: string;
  public title!: string;
  public message!: string;
  public status!: "read" | "unread";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("read", "unread"),
      defaultValue: "unread",
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
  }
);

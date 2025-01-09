import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequalize.config";
import { Product } from "./product.model";

// Auction atributlari uchun interfeys
interface AuctionAttributes {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  startingBid: string;
  productId: string;
  createdBy: string; // Admin yoki foydalanuvchi tomonidan kim yaratilgan
}

// Yaratishda faqat id optional bo'lishi uchun interfeys
interface AuctionCreationAttributes
  extends Optional<AuctionAttributes, "id" | "description"> {}

// Auction modeli
export class Auction
  extends Model<AuctionAttributes, AuctionCreationAttributes>
  implements AuctionAttributes
{
  public id!: string;
  public title!: string;
  public description?: string;
  public startTime!: string;
  public endTime!: string;
  public startingBid!: string;
  public productId!: string;
  public createdBy!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Auction modelini aniqlash
Auction.init(
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    startingBid: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "auctions",
    timestamps: true,
  }
);



import { Bid } from "./bid.model";
import { Category } from "./categories.model";
import { Features } from "./featuresItems.model";
import { HeroSlider } from "./heroSlider.model";
import { Product } from "./product.model";
import { SubCategory } from "./subCategory.model";
import { User } from "./user.model";
import { Participant } from "./participant.model";
import { ProductParticipants } from "./ProductParticipants";
import { sequelize } from "../config/sequalize.config";
import { Notification } from "./notification.model";
import { Auction } from "./auctionAttributes.model";

Product.belongsToMany(Participant, {
  through: "ProductParticipants",
  foreignKey: "productId",
  otherKey: "participantId",
  as: "participants",
});

// Define associations between models
Participant.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Participant.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Bid.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Bid.belongsTo(User, {
  foreignKey: "senderId",
  as: "user",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Product.hasMany(Bid, {
  foreignKey: "productId",
  as: "bids",
});




// Define associations for SubCategory
SubCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category", // Alias for the association
});

Category.hasMany(SubCategory, {
  foreignKey: "categoryId",
  as: "subcategories", // Alias for the association
});

Product.belongsTo(SubCategory, {
  foreignKey: 'subCategoryId',
  as: 'subCategory',
});

SubCategory.hasMany(Product, {
  foreignKey: 'subCategoryId',
  as: 'products',
});

Auction.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(Auction, { foreignKey: "productId", as: "auctions" });

sequelize.sync({ force: false, alter: true });

export {
  Bid,
  Participant,
  Category,
  Features,
  HeroSlider,
  Product,
  SubCategory,
  User,
  ProductParticipants,
  Auction,
  Notification
};

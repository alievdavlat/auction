import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/sequalize.config"; // Sequelize instansiyasini import qiling

export class HeroSlider extends Model {}

HeroSlider.init(
  {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HeroSlider",
  }
);

export default HeroSlider;

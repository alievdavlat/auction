import { Router } from "express"
import AuthRouter from "./auth.routes"
import CategoryRouter from "./category.routes"
import FeaturesRouter from "./features.routes"
import HeroRouter from "./hero.routes"
import ProductRouter from "./product.routes"
import SubCategoryROuter from "./subCategoryRoutes.routes"
import UploadMediaRouter from "./upload.routes"
import UsersRouter from "./user.routes"
import ParticipantRouter from "./participants.routes"
import AuctionRouter from "./auction.routes"
import NotificationRouter from "./notification.routes"

const MainRouter = Router()

export default MainRouter.use([
  AuthRouter,
  CategoryRouter,
  FeaturesRouter,
  HeroRouter,
  ProductRouter,
  SubCategoryROuter,
  UploadMediaRouter,
  UsersRouter,
  ParticipantRouter,
  AuctionRouter,
  NotificationRouter
])
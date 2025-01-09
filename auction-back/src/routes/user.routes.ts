import { Router } from "express";
import {
  deleteAccount,
  getAllUsers,
  updatePassword,
  updateProfile,
} from "../controllers/users.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const UsersRouter = Router();

UsersRouter.get("/users-list", getAllUsers); // Token talab qilinmaydi
UsersRouter.put("/user/profile", updateProfile); // Token talab qilinadi
UsersRouter.delete("/user/account", deleteAccount); // Token talab qilinadi
UsersRouter.put("/user/password", updatePassword); // Token talab qilinadi

export default UsersRouter;

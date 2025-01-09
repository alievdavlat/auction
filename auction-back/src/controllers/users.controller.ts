import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, fullname } = req.body;
  const {userId} = req.body; // Middleware orqali foydalanuvchi ID'si keladi

  try {
    // Foydalanuvchini ID orqali toping
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    // Ma'lumotlarni yangilash
    user.username = username || user.username;
    user.fullname = fullname || user.fullname;
    await user.save();

    return res.status(200).json({
      message: "Profil muvaffaqiyatli yangilandi",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Xatolik yuz berdi" });
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {userId} = req.body // Middleware orqali foydalanuvchi ID'si keladi

  try {
    // Foydalanuvchini toping
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    // Foydalanuvchini o'chirish
    await user.destroy();

    return res
      .status(200)
      .json({ message: "Akkaunt muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Xatolik yuz berdi" });
  }
};

export const updatePassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { oldPassword, newPassword } = req.body;
  const {userId} = req.body; // Middleware orqali foydalanuvchi ID'si keladi

  try {
    // Foydalanuvchini toping
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    // Eski parolni tekshirish
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Eski parol noto'g'ri" });
    }

    // Yangi parolni hash qilish va saqlash
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Parol muvaffaqiyatli yangilandi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Xatolik yuz berdi" });
  }
};

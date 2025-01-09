import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models";

// SuperAdmin credentials
const SUPER_ADMIN_USERNAME = process.env.SUPER_ADMIN_USERNAME || "superadmin";
const SUPER_ADMIN_PASSWORD =
  process.env.SUPER_ADMIN_PASSWORD || "superadminpassword";

// Token yaratish funksiyasi
const generateToken = (userId: string, role: string) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "your_jwt_secret_key", // Yashirin kalit
    { expiresIn: "365d" } // Token muddati
  );
};

// Register funksiyasi
export const register = async (req: Request, res: Response):Promise<any> => {
  const { username, password, fullname } = req.body;

  try {
    // Validatsiya
    if (!username || !password || !fullname) {
      console.log("Validation failed: Missing username or password");
      return res
        .status(400)
        .json({ message: "Username va passwordni kiriting" });
    }
  
    // Super admin tekshiruvi
    console.log("Checking if user is super admin");
    if (username === SUPER_ADMIN_USERNAME && password === SUPER_ADMIN_PASSWORD) {
      const superAdminExists = await User.findOne({ where: { username } });
      console.log("Super admin exists:", superAdminExists);
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password:", hashedPassword);
  
      if (superAdminExists) {
        const token = generateToken(superAdminExists.id, superAdminExists.role);
        console.log("Generated token for super admin:", token);
  
        return res.status(201).json({
          message: "Super admin muvaffaqiyatli ro'yxatdan o'tdi",
          token,
          user: superAdminExists,
        });
      }
  
      const superAdmin = await User.create({
        username,
        password: hashedPassword,
        role: "superadmin",
        fullname
      });
  
      const token = generateToken(superAdmin.id, superAdmin.role);
      console.log("Created super admin:", superAdmin);
  
      return res.status(201).json({
        message: "Super admin muvaffaqiyatli ro'yxatdan o'tdi",
        token,
        user: superAdmin,
      });
    }
  
    // Oddiy foydalanuvchi
    console.log("Checking if user exists");
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      console.log("User already exists");
      return res
        .status(400)
        .json({ message: "Foydalanuvchi allaqachon ro'yxatdan o'tgan" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password for user:", hashedPassword);
  
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: "user",
      fullname
    });
  
    const token = generateToken(newUser.id, newUser.role);
    console.log("New user created:", newUser);
  
    return res.status(201).json({
      message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Ishlab chiqarishda xatolik yuz berdi" });
  }
  
};

// Login funksiyasi
export const login = async (req: Request, res: Response):Promise<any> => {
  const { username, password, fullname } = req.body;

  try {
    // Username va password validatsiyasi
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username va passwordni kiriting" });
    }

    // User tekshiruvi
    const user = await User.findOne({ where: { username } });
    if (
      username === SUPER_ADMIN_USERNAME &&
      password === SUPER_ADMIN_PASSWORD &&
      !user
    ) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const superAdmin = await User.create({
        username,
        password: hashedPassword,
        role: "superadmin",
        fullname
      });
      const token = generateToken(superAdmin.id, superAdmin.role);

      return res.status(201).json({
        message: "Super admin muvaffaqiyatli tizimga kirdi",
        token,
        user: superAdmin,
      });
    }
    
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Noto'g'ri parol" });
    }

    // Super admin uchun alohida tekshiruv
    if (user.role === "superadmin") {
      // Agar super admin bo'lsa, foydalanuvchi allaqachon ro'yxatdan o'tgan bo'lishi kerak
      return res.status(200).json({
        message: "Super admin muvaffaqiyatli tizimga kirdi",
        token: generateToken(user.id, user.role),
        user,
      });
    }

    // Oddiy foydalanuvchi login qilish
    if (user.role === "user") {
      return res.status(200).json({
        message: "Foydalanuvchi muvaffaqiyatli tizimga kirdi",
        token: generateToken(user.id, user.role),
        user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ishlab chiqarishda xatolik yuz berdi" });
  }
};

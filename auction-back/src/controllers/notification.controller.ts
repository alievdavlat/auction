import { Request, Response,  } from "express";
import { Op } from "sequelize";
import cron from "node-cron";
import { Notification } from "../models"; // Notification modeli


export const notificationController = {
  // Barcha xabarlarni olish
  getAllNotification: async (req: Request, res: Response):Promise<any> => {
    try {
      const notifications = await Notification.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        status: 200,
        notifications,
        msg: "All notifications retrieved successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error retrieving notifications",
        error: error.message,
      });
    }
  },

  // ID bo‘yicha xabarni olish
  getNotificationById: async (req: Request, res: Response):Promise<any> => {
    try {
      const { id } = req.params;

      const notification = await Notification.findByPk(id);

      if (!notification) {
        return res.status(404).json({
          message: "Notification not found",
        });
      }

      res.status(200).json({
        status: 200,
        notification,
        msg: "Notification retrieved successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error retrieving notification",
        error: error.message,
      });
    }
  },

  // Faqat "read" xabarlarni olish va hisobini qaytarish
  getReadNotifications: async (req: Request, res: Response):Promise<any> => {
    try {
      const readNotifications = await Notification.findAll({
        where: { status: "read" },
        order: [["createdAt", "DESC"]],
      });

      const count = await Notification.count({
        where: { status: "read" },
      });

      res.status(200).json({
        status: 200,
        count,
        notifications: readNotifications,
        msg: "Read notifications retrieved successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error retrieving read notifications",
        error: error.message,
      });
    }
  },

  // Faqat "unread" xabarlarni olish va hisobini qaytarish
  getUnreadNotifications: async (req: Request, res: Response):Promise<any> => {
    try {
      const unreadNotifications = await Notification.findAll({
        where: { status: "unread" },
        order: [["createdAt", "DESC"]],
      });

      const count = await Notification.count({
        where: { status: "unread" },
      });

      res.status(200).json({
        status: 200,
        count,
        notifications: unreadNotifications,
        msg: "Unread notifications retrieved successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error retrieving unread notifications",
        error: error.message,
      });
    }
  },

  // Xabar holatini yangilash ("read" qilish)
  updateNotification: async (req: Request, res: Response):Promise<any> => {
    try {
      const { id } = req.params;

      const notification = await Notification.findByPk(id);

      if (!notification) {
        return res.status(404).json({
          message: "Notification not found",
        });
      }

      // Statusni "read" ga o'zgartirish
      notification.set("status", "read");
      await notification.save();

      res.status(200).json({
        status: 200,
        message: "Notification status updated to 'read'",
        notification,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error updating notification",
        error: error.message,
      });
    }
  },
};


// Cron vazifasi: o‘qilgan xabarlarni 30 kundan keyin o‘chirish
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    await Notification.destroy({
      where: {
        status: "read",
        createdAt: {
          [Op.lt]: thirtyDaysAgo,
        },
      },
    });

    console.log("Deleted read notifications");
  } catch (err: any) {
    console.error("Error deleting notifications:", err.message);
  }
});

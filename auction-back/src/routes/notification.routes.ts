import { Router } from "express";
import { notificationController } from "../controllers/notification.controller";

const NotificationRouter = Router();

// Barcha xabarlarni olish
NotificationRouter.get("/notifications", notificationController.getAllNotification);

// ID bo‘yicha xabarni olish
NotificationRouter.get("/notification:id", notificationController.getNotificationById);

// Faqat "read" statusidagi xabarlarni olish
NotificationRouter.get("/notifications/status/read", notificationController.getReadNotifications);

// Faqat "unread" statusidagi xabarlarni olish
NotificationRouter.get("/notifications/status/unread", notificationController.getUnreadNotifications);

// Xabar holatini yangilash ("read" qilish)
NotificationRouter.put("/notification/:id", notificationController.updateNotification);

export default NotificationRouter;

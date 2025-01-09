import { Request, Response } from "express";
import { Auction, Notification, Product } from "../models";

export const auctionController = {
  // Barcha auksionlarni olish
  getAllAuctions: async (req: Request, res: Response): Promise<any> => {
    try {
      const auctions = await Auction.findAll({
        include: [{ model: Product, as: "product" }],
        order: [["startTime", "ASC"]],
      });

      res.status(200).json({
        success: true,
        message: "Auctions retrieved successfully",
        auctions,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving auctions",
        error: error.message,
      });
    }
  },
  getAuctionById: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const auction = await Auction.findByPk(id, {
        include: [{ model: Product, as: "product" }],
      });

      if (!auction) {
        return res.status(404).json({
          success: false,
          message: "Auction not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Auction retrieved successfully",
        auction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving auction",
        error: error.message,
      });
    }
  },

  // Auksion yaratish
  createAuction: async (req: Request, res: Response): Promise<any> => {
    try {
      const { title, description, startTime, endTime, startingBid, productId, createdBy } = req.body;

      // Mahsulotni tekshirish
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const auction = await Auction.create({
        title,
        description,
        startTime,
        endTime,
        startingBid,
        productId,
        createdBy,
      });
      await Notification.create({
        title: "New auction",
        message: `A new auction has been comming soon: ${auction.title}`,
        status: "unread",
       })


      res.status(201).json({
        success: true,
        message: "Auction created successfully",
        auction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating auction",
        error: error.message,
      });
    }
  },

  // Auksionni yangilash
  updateAuction: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      console.log(req.body)
      const { title, description, startTime, endTime, startingBid, productId } = req.body;

      const auction = await Auction.findByPk(id);
      if (!auction) {
        return res.status(404).json({
          success: false,
          message: "Auction not found",
        });
      }

      if (productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }
      }

      await auction.update({...req.body });

      res.status(200).json({
        success: true,
        message: "Auction updated successfully",
        auction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating auction",
        error: error.message,
      });
    }
  },

  // Auksionni o'chirish
  deleteAuction: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const auction = await Auction.findByPk(id);
      if (!auction) {
        return res.status(404).json({
          success: false,
          message: "Auction not found",
        });
      }

      await auction.destroy();

      res.status(200).json({
        success: true,
        message: "Auction deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting auction",
        error: error.message,
      });
    }
  },
};

import express from "express";
import { auctionController } from "../controllers/auction.controller";

const AuctionRouter = express.Router();

AuctionRouter.get("/auction", auctionController.getAllAuctions);
AuctionRouter.get("/auction/:id", auctionController.getAuctionById);
AuctionRouter.post("/auction", auctionController.createAuction);
AuctionRouter.put("/auction/:id", auctionController.updateAuction);
AuctionRouter.delete("/auction/:id", auctionController.deleteAuction);

export default AuctionRouter;

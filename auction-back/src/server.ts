import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import http from "http";
import { initSocketServer } from "./socket.server";
import mainRouterRoutes from "./routes/mainRouter.routes";
import { sequelize } from "./config/sequalize.config";

const PORT: string | number = process.env.PORT || 4000;

const app: Application = express();
const server = http.createServer(app);



  (async function () {
    try {
      await sequelize.authenticate();
      console.log('db connection');
    } catch (error:any) {
      console.log('db error, ', error.message);
    }
  })();
// Middlewarelar
app.set("view engine", "ejs");
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.static(path.join(process.cwd(), "uploads")));
app.use(express.static(path.join(process.cwd(), "uploads", "images")));
app.use(express.static(path.join(process.cwd(), "uploads", "videos")));


// Asosiy router
app.use(mainRouterRoutes);

// Test route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("API is working");
});

// Socket serverni ishga tushirish
initSocketServer(server);

// Serverni ishga tushirish
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

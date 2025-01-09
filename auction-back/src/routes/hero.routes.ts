  import express from 'express';
  import {
    createHero,
    getAllHeroes,
    getHeroById,
    deleteHero
  } from '../controllers/hero.controller';
import { upload } from '../utils/multer';

  const HeroRouter = express.Router();

  HeroRouter.post('/hero', upload.single("image"),createHero);
  HeroRouter.get('/hero', getAllHeroes);
  HeroRouter.get('/hero/:id', getHeroById);
  HeroRouter.delete('/hero/:id', deleteHero);

  export default HeroRouter;

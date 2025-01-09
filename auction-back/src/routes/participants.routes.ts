import express from 'express';
import { getAllParticipants } from '../controllers/participant.controller';


const ParticipantRouter = express.Router();

ParticipantRouter.get('/participants', getAllParticipants);

export default ParticipantRouter;

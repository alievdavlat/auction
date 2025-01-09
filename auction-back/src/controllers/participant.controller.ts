import { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import { Participant, Product, ProductParticipants, User } from '../models';

export const getAllParticipants = async (req:Request, res:Response):Promise<any> => {
  try {
    const participants = await Participant.findAll({
      include: [
        { model: User, as: 'user' },
      ],
    });

   res.status(200).json(participants);
  } catch (error) {
    console.error('Error getting all participants:', error);
    return [];
  }
};
// Auksionga ishtirokchi qo'shish
export const joinAuction = async (socket: Socket, io: Server, productId: string, userId: string) => {
  try {
 
    
    // Ishtirokchini yaratish agar mavjud bo'lmasa
    let participant = await Participant.findOne({
      where: { productId, userId },
    });

    if (!participant) {
      participant = await Participant.create({
        productId,
        userId,
      });


     await ProductParticipants.create({
        productId,
        participantId: participant.id,
      });
    }

    // Yangilangan ishtirokchilar ro'yxatini barcha foydalanuvchilarga yuborish
    io.emit(`auction_update_${productId}`, {
      action: 'joined',
      participantId: participant.id,
      userId,
    });

    console.log(`Foydalanuvchi ${userId} auksionga qo'shildi: ${productId}`);
  } catch (err) {
    console.error('Auksionga qo\'shilish xatosi:', err);
    socket.emit('error', { message: 'Auksionga qo\'shilishda xato yuz berdi' });
  }
};

// Auksiondan ishtirokchini olib tashlash
export const leaveAuction = async (socket: Socket, io: Server, productId: string, userId: string) => {
  try {


    // Ishtirokchini ro'yxatdan o'chirish
    const participant = await Participant.findOne({
      where: { productId, userId },
    });

    if (!participant) {
      return socket.emit('error', { message: 'Ishtirokchi topilmadi' });
    }

    await participant.destroy();
    await ProductParticipants.destroy({
      where: { productId, participantId: participant.id },
    });
    // Yangilangan ishtirokchilar ro'yxatini barcha foydalanuvchilarga yuborish
    io.emit(`auction_update_${productId}`, {
      action: 'left',
      participantId: participant.id,
      userId,
    });

    console.log(`Foydalanuvchi ${userId} auksiondan chiqdi: ${productId}`);
  } catch (err) {
    console.error('Auksiondan chiqish xatosi:', err);
    socket.emit('error', { message: 'Auksiondan chiqishda xato yuz berdi' });
  }
};

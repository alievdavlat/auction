import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { joinAuction, leaveAuction } from './controllers/participant.controller';
import { Bid } from './models';

let io: SocketIOServer;

export const initSocketServer = (server: http.Server) => {
  io = new SocketIOServer(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join_auction', (productId: string, userId: string) => {
      joinAuction(socket, io, productId, userId);
    });

    socket.on('leave_auction', (productId: string, userId: string) => {
      leaveAuction(socket, io, productId, userId);
    });

    socket.on('createBid', async (bidData) => {
      try {
        const { value, senderId, senderUsername, productId } = bidData;

        const newBid = await Bid.create({
          value,
          senderId,
          senderUsername,
          productId,
        });

        io.emit('newBid', newBid);
      } catch (error) {
        console.error('Error creating bid:', error);
      }
    });

    socket.on('notification', (data) => {
      io.emit('newNotification', data)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

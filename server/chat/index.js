const { Message } = require('../db/models');

const onConnection = (socket, io) => {
  const { handshake } = socket;
  const { headers } = handshake;

  console.log('User connected', headers.host);

  socket.on('message:send', async ({ message, room, user }) => {
    socket.join(room);
    try {
      const newMessage = await Message.create(
        { stream_id: room, user_id: user, message },
      );
      io.to(room).emit('message:get', {
        chatMessage: newMessage, room, user, error: null,
      });
      console.log(`User: ${headers.host} ${user} - Отправил сообщение " ${message} " в комнату:`, room);
    } catch (error) {
      io.to(room).emit('message:error', { message, error });
      console.log(`User: ${headers.host} ${user} - ошибка сообщение " ${message} " ошибка:`, error);
    }
  });
};

module.exports = { onConnection };

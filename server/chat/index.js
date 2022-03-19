const registerMessageHandlers = require('./handlers/messageHandlers');
const registerUserHandlers = require('./handlers/userHandlers');

const onConnection = (socket, io) => {
  // выводим сообщение о подключении пользователя
  console.log('User connected');

  socket.broadcast.emit('chat message', 'hi');

  registerMessageHandlers(io, socket);
  registerUserHandlers(io, socket);

  // обрабатываем отключение сокета-пользователя
  socket.on('disconnect', () => {
    // выводим сообщение
    console.log('User disconnected');
    // покидаем комнату
    socket.leave();
  });
};

module.exports = { onConnection };

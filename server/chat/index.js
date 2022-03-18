// const registerMessageHandlers = require('./handlers/messageHandlers');
// const registerUserHandlers = require('./handlers/userHandlers');

// данная функция выполняется при подключении каждого сокета (обычно, один клиент = один сокет)
const onConnection = (socket, io) => {
  // выводим сообщение о подключении пользователя
  console.log('User connected');

  socket.broadcast.emit('hi');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // // получаем название комнаты из строки запроса "рукопожатия"
  // const { roomId } = socket.handshake.query;

  // // сохраняем название комнаты в соответствующем свойстве сокета
  // socket.roomId = roomId;

  // // присоединяемся к комнате (входим в нее)
  // socket.join(roomId);

  // // регистрируем обработчики
  // // обратите внимание на передаваемые аргументы
  // registerMessageHandlers(io, socket);
  // registerUserHandlers(io, socket);

  // // обрабатываем отключение сокета-пользователя
  // socket.on('disconnect', () => {
  //   // выводим сообщение
  //   console.log('User disconnected');
  //   // покидаем комнату
  //   socket.leave(roomId);
  // });
};

module.exports = { onConnection };

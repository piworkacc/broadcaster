const onConnection = (socket, io) => {
  const { handshake } = socket;
  const { headers } = handshake;

  console.log('User connected', headers.host);

  socket.on('message:send', ({ message, room }) => {
    console.log(`User: ${headers.host} - Отправил сообщение " ${message} " в комнату:`, room);

    socket.join(room);
    io.to(room).emit('message:send', message);
  });

  // socket.on('message:send', (msg) => {
  //   console.log(`Отправил сообщение " ${msg.message} " в комнату: ${msg.room}`);
  //   io.emit('message:send', msg);
  // });
};

module.exports = { onConnection };

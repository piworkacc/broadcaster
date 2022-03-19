const onConnection = (socket, io) => {
  console.log('User connected');

  // socket.on('message:send', (msg) => {
  //   socket.join(2);
  //   io.to(2).emit('message:send', msg);
  // });
  socket.on('message:send', (msg) => {
    io.emit('message:send', msg);
  });
};

module.exports = { onConnection };

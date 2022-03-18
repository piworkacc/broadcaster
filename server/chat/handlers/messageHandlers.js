module.exports = (io, socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('message:add', (msg) => {
    io.emit('message:add', msg.message);
  });

  socket.on('message:get', console.log);
  socket.on('message:add', console.log);
  socket.on('message:remove', console.log);
};

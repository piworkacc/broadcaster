const { Message, User } = require('../db/models');

const defaultErrorMessaage = {
  id: 0,
  userName: 'anonymous',
  User: {
    name: 'anonymous',
  },
  message: '',
  createdAt: new Date(),
};

const onConnection = (socket, io) => {
  const { handshake } = socket;
  const { headers } = handshake;

  console.log('User connected', headers.host);
  socket.on('message:join', ({ message, room, user }) => {
    // if (user.ok) 
    socket.join(room);
  });
  socket.on('message:send', async ({ message, room, user }) => {
    if (user.ok) {
      try {
        const messagefromDB = await Message.create({
          stream_id: room,
          user_id: user.id,
          message,
        });
        const { name } = await User.findOne({
          raw: true,
          where: {
            id: user.id,
          },
        });

        const { dataValues } = { ...messagefromDB };
        dataValues.userName = name;

        io.to(room).emit('message:get', {
          newMessage: dataValues,
          name,
          room,
          error: null,
        });
        console.log(
          `User: ${headers.host} - ${user.name} - Отправил сообщение " ${message} " в комнату:`,
          room,
        );
      } catch (error) {
        io.to(room).emit('message:error', { message, error });
        console.log(
          `User: ${headers.host} ${user} - ошибка сообщение " ${message} " ошибка:`,
          error,
        );
      }
    } else {
      defaultErrorMessaage.message = 'Пользователь не авторизован';
      io.emit('message:error', {
        newMessage: defaultErrorMessaage,
        error: true,
      });
      console.log(
        `User: ${headers.host} ${user} - ошибка сообщение " ${defaultErrorMessaage.message} " ошибка:`,
      );
    }
  });

  socket.on('disconnect', () => {
    console.log(`User: ${headers.host} leave room`);
  });
};

module.exports = { onConnection };

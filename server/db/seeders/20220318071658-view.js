'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'select * from "Users" ',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    const streams = await queryInterface.sequelize.query(
      'select * from "Streams" ',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    await queryInterface.bulkInsert(
      'Views',
      [
        {
          user_id: users[1].id,
          stream_id: streams[0].id,
          time_joined: new Date(),
          time_left: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: users[2].id,
          stream_id: streams[0].id,
          time_joined: new Date(),
          time_left: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: users[2].id,
          stream_id: streams[1].id,
          time_joined: new Date(),
          time_left: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: users[1].id,
          stream_id: streams[1].id,
          time_joined: new Date(),
          time_left: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: users[2].id,
          stream_id: streams[2].id,
          time_joined: new Date(),
          time_left: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Views', null, {});
  },
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Views', [
      {
        user_id: 2,
        stream_id: 1,
        time_joined: new Date().toISOString(),
        time_left: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        user_id: 3,
        stream_id: 1,
        time_joined: new Date().toISOString(),
        time_left: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        user_id: 2,
        stream_id: 2,
        time_joined: new Date().toISOString(),
        time_left: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        stream_id: 1,
        time_joined: new Date().toISOString(),
        time_left: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        user_id: 2,
        stream_id: 3,
        time_joined: new Date().toISOString(),
        time_left: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Views', null, {});
  }
};

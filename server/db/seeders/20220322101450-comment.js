'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        user_id: 1,
        stream_id: 1,
        comment: 'Мой первый коммент!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        user_id: 1,
        stream_id: 1,
        comment: 'Во время работы с конкретной задачей (и конкретной веткой) почаще делай commit',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};

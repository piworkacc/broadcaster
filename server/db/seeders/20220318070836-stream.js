module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Streams', [
      {
        user_id: 1,
        title: 'My 1 stream',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        broadcast_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        user_id: 1,
        title: 'My 2 stream',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        broadcast_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        user_id: 1,
        title: 'My 3 stream',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        broadcast_id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Streams', null, {});
  },
};

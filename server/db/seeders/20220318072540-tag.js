'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      {
        tag: 'игры',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        tag: 'музыка',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        tag: 'блоггинг',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          tag: 'игры',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'музыка',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'блоггинг',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'образование',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'путешествия',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'АСМР',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};

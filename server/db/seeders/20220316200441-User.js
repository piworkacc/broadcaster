const sha256 = require('sha256');
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    for (let i = 0; i < 50; i += 1) {
      data.push({
        name: faker.name.firstName(),
        password: sha256('123'),
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Users', data, {});

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'artem',
          password: sha256('123'),
          email: 'artem@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'katya',
          password: sha256('123'),
          email: 'katya@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'vanya',
          password: sha256('123'),
          email: 'vanya@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ilya',
          password: sha256('123'),
          email: 'ilya@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'kukech',
          password: sha256('123'),
          email: 'kukech@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

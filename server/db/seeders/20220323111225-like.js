'use strict';

const { randomArrayElement } = require('../../src/miscellaneous');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const streams = await queryInterface.sequelize.query(
      'select * from "Streams"',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    const users = await queryInterface.sequelize.query(
      'select * from "Users"',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const data = [];
    streams.forEach((elStream) => {
      const count = Math.trunc(Math.random() * 20) + 10;
      const userIds = new Set();

      for (let i = 0; i <= count; i += 1) {
        userIds.add(randomArrayElement(users).id);
      }
      userIds.forEach((elUser) => {
        data.push({
          stream_id: elStream.id,
          user_id: elUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert('Likes', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
  },
};

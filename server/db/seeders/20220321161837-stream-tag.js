'use strict';

const { randomArrayElement } = require('../../src/miscellaneous');

module.exports = {
  async up(queryInterface, Sequelize) {
    const streams = await queryInterface.sequelize.query(
      'select * from "Streams" ',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    const tags = await queryInterface.sequelize.query('select * from "Tags"', {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    const data = streams.map((el) => ({
      stream_id: el.id,
      tag_id: randomArrayElement(tags).id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('StreamTags', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StreamTags', null, {});
  },
};

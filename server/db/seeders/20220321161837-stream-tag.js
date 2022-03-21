'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const streams = await queryInterface.sequelize.query(
      'select * from "Streams" ',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const tags = await queryInterface.sequelize.query('select * from "Tags"', {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    await queryInterface.bulkInsert(
      'StreamTags',
      [
        {
          tag_id: tags[0].id,
          stream_id: streams[0].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          tag_id: tags[1].id,
          stream_id: streams[1].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          tag_id: tags[2].id,
          stream_id: streams[2].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StreamTags', null, {});
  },
};

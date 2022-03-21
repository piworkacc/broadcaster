const { randomString } = require('../../src/miscellaneous');

module.exports = {
  async up(queryInterface, Sequelize) {
    const user = (
      await queryInterface.sequelize.query('select * from "Users" limit 1', {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      })
    )[0];
    await queryInterface.bulkInsert(
      'Streams',
      [
        {
          user_id: user.id,
          title: 'My 1 stream',
          start: new Date().toISOString(),
          stream_key: randomString() + randomString(),
          end: new Date().toISOString(),
          broadcast_id: randomString(),
          preview:
            'https://c.ndtvimg.com/2020-08/h5mk7js_cat-generic_625x300_28_August_20.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          user_id: user.id,
          title: 'My 2 stream',
          start: new Date().toISOString(),
          stream_key: randomString() + randomString(),
          end: new Date().toISOString(),
          broadcast_id: randomString(),
          preview:
            'https://c.ndtvimg.com/2020-08/h5mk7js_cat-generic_625x300_28_August_20.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          user_id: user.id,
          title: 'My 3 stream',
          start: new Date().toISOString(),
          end: new Date().toISOString(),
          stream_key: randomString() + randomString(),
          broadcast_id: randomString(),
          preview:
            'https://c.ndtvimg.com/2020-08/h5mk7js_cat-generic_625x300_28_August_20.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Streams', null, {});
  },
};

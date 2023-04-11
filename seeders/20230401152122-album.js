'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Albums', [{
      name: 'HOPE',
      year: '2023',
      imgurl: '/images/nf-hope-album-image_480.jpg',
      artistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};

'use strict';

const artist = require('../models/artist');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('artists',
      [
        {
          name: 'nf',
          genre: 'rap',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('artists', null, {});
  }
};

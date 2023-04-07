'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'Ramonrocks',
      email: 'rjscccolor@gmail.com',
      password: await bcrypt.hash('9857740964', 10),
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: 'Ramonrocks',
      email: 'rjscccolor@gmail.com',
      password: '9857740964',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

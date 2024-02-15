const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        id: '9892',
        name: '2911',
        rol: 'admin',
        password: '2911',
        ubication: 'villa colombia',
        registration_date: '2024-02-15 00:00',
        email: 'admin@bigjuice.com',
        phone: '333333',
        address: 'Clle 51 # 14 - 11',
        cedula: '123456789',
      },
      // Add more user data objects here
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Projects', [
      {
        name: 'BrainStation - Capstone',
        start_date: 1543467600000,
        end_date: 1544590800000,
        client_id: 1
      }, 
      {
        name: 'BrainStation - Project#1',
        start_date: 1544467600000,
        end_date:1544590800000,
        client_id: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Projects', null, {});
  }
};

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
    return queryInterface.bulkInsert('Employees', [
      {
        first_name: 'Tony',
        last_name: 'Stark',
        lat: 43.642567,
        long: -79.387054,
        project_id: null
      },
      {
        first_name: 'Thor',
        last_name: 'Odinson',
        lat: 43.750198,
        long: -79.267273,
        project_id: null
      },
      {
        first_name: 'Stephen',
        last_name: 'Strange',
        lat: 43.642567,
        long: -79.387054,
        project_id: null
      },
      {
        first_name: 'Bruce',
        last_name: 'Banner',
        lat: 43.654919,
        long: -79.379288,
        project_id: null
      },
      {
        first_name: 'Peter',
        last_name: 'Parker',
        lat: 43.593079,
        long: -79.642494,
        project_id: null
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
    return queryInterface.bulkDelete('Employees', null, {});
  }
};

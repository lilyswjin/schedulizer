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
        // project_id: null
      },
      {
        first_name: 'Thor',
        last_name: 'Odinson',
        lat: 43.750198,
        long: -79.267273,
        // project_id: null
      },
      {
        first_name: 'Stephen',
        last_name: 'Strange',
        lat: 43.642567,
        long: -79.387054,
        // project_id: null
      },
      {
        first_name: 'Bruce',
        last_name: 'Banner',
        lat: 43.654919,
        long: -79.379288,
        // project_id: null
      },
      {
        first_name: 'Peter',
        last_name: 'Parker',
        lat: 43.593079,
        long: -79.642494,
        // project_id: null
      },
      {
        first_name: 'Natasha',
        last_name: 'Romanoff',
        lat: 43.766304,
        long: -79.412449,
        // project_id: null
      },
      {
        first_name: 'I am',
        last_name: 'Groot',
        lat: 40.712776,
        long: -74.005974,
        // project_id: null
      },
      {
        first_name: 'Loki',
        last_name: 'Odinson',
        lat: 43.593079,
        long: -79.642494,
        // project_id: null
      },
      {
        first_name: 'Steve',
        last_name: 'Rogers',
        lat: 43.751062,
        long: -79.459514,
        // project_id: null
      },
      {
        first_name: 'Melinda',
        last_name: 'May',
        lat: 43.695451,
        long: -79.809575,
        // project_id: null
      },
      {
        first_name: 'Daisy',
        last_name: 'Johnson',
        lat: 43.567227,
        long: -79.642494,
        // project_id: null
      },
      {
        first_name: 'Philip',
        last_name: 'Coulson',
        lat: 43.593079,
        long: -79.679104,
        // project_id: null
      },
      {
        first_name: 'Dead',
        last_name: 'Pool',
        lat: 44.391798,
        long: -79.712104,
        // project_id: null
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

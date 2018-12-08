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
        street: "301 Front St W",
        post_code: "M5V 2T6",
        city: "Toronto",
        province: "Ontario",
        country: "Canada"
      },
      {
        first_name: 'Thor',
        last_name: 'Odinson',
        lat: 43.750198,
        long: -79.267273,
        street: "301 Prudential Dr",
        post_code: "M1P 4V3",
        city: "Scarborough",
        province: "Ontario",
        country: "Canada"
      },
      {
        first_name: 'Stephen',
        last_name: 'Strange',
        lat: 43.642567,
        long: -79.387054,
        street: "301 Front St W",
        post_code: "M5V 2T6",
        city: "Toronto",
        province: "Ontario",
        country: "Canada"
      },
      {
        first_name: 'Bruce',
        last_name: 'Banner',
        lat: 43.654919,
        long: -79.379288,
        street: "4220 Victoria St",
        post_code: "M5B 2R6",
        city: "Toronto",
        province: "Ontario",
        country: "Canada"
      },
      {
        first_name: 'Peter',
        last_name: 'Parker',
        lat: 43.593079,
        long: -79.642494,
        street: "460 King St W",
        post_code: "M5V 1L7",
        city: "Toronto",
        province: "Ontario",
        country: "Canada"
      },
      {
        first_name: 'Natasha',
        last_name: 'Romanoff',
        lat: 43.766304,
        long: -79.412449,
        street: "100 City Centre Dr",
        post_code: "L5B 2C9",
        city: "Toronto",
        province: "Ontario",
        country: "Canada"
      },
      {
        first_name: 'I am',
        last_name: 'Groot',
        lat: 40.712776,
        long: -74.005974,
        street: "230 Broadway",
        post_code: "10007",
        city: "New York",
        province: "New York",
        country: "USA"
      },
      {
        first_name: 'Dead',
        last_name: 'Pool',
        lat: 44.391798,
        long: -79.712104,
        street: "81 Letitia St",
        post_code: "L4N 2B2",
        city: "Barrie",
        province: "Ontario",
        country: "Canada"
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

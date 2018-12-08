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
    return queryInterface.bulkInsert('Clients', [
      {
        name: 'BrainStation',
        lat: 43.645543,
        long: -79.395385,
        street: "460 King St W",
        post_code: "M5V 1L7",
        city: "Toronto",
        province: "Ontario",
        country: "Canada"
      },
      {
        name: 'Eaton Center',
        lat: 43.654919,
        long: -79.379288,
        street: "220 Yonge St",
        post_code: "M5B 2H1",
        city: "Toronto",
        province: "Ontario",
        country: "Canada"
      },
      {
        name: 'McDonalds',
        lat: 43.727832,
        long: -79.344634,
        street: "1 McDonalds Pl",
        post_code: "M3C 3L4",
        city: "North York",
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
    return queryInterface.bulkDelete('Clients', null, {});
  }
};

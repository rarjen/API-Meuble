"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Coordinates",
      [
        {
          address_id: 1,
          lat: -7.14109,
          lng: 110.28436,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Coordinates", null, {});
  },
};

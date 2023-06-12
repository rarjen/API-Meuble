"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Sizes",
      [
        {
          panjang: 32,
          lebar: 28,
          tinggi: 16,
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sizes", null, {});
  },
};

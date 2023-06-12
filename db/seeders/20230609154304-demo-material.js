"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Materials",
      [
        {
          material: "Kayu Jati",
          panjang: 120,
          lebar: 10,
          tebal: 3,
          harga: 75000,
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          material: "Kayu Pinus",
          panjang: 200,
          lebar: 7,
          tebal: 1.2,
          harga: 19900,
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Materials", null, {});
  },
};

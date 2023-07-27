"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Provinces",
      [
        {
          id: 3,
          province: "Banten",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          province: "DI Yogyakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          province: "DKI Jakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          province: "Jawa Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          province: "Jawa Tengah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          province: "Jawa Timur",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Provinces", null, {});
  },
};

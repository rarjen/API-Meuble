"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          category: "Meja",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Kursi",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Lemari",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

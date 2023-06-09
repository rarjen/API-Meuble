"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          category: "Meja",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Kursi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Lemari",
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

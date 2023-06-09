"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Addresses",
      [
        {
          user_id: 1,
          province_id: 10,
          city_id: 181,
          address:
            "Mangir RT 03 RW 02, Purwongondo, Boja, Kabupaten Kendal, Jawa Tengah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};

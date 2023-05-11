"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 1,
          category_id: 1,
          brand: "Maspion",
          nama: "Kursi Plastik + Busa",
          deskripsi: "Ini deskripsi",
          stock: 150,
          harga: 150000,
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          category_id: 1,
          brand: "Maspion",
          nama: "Kursi Plastik",
          deskripsi: "Ini deskripsi",
          stock: 150,
          harga: 100000,
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          category_id: 2,
          brand: "Mejaku",
          nama: "Meja",
          deskripsi: "Ini deskripsi",
          stock: 56,
          harga: 300000,
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
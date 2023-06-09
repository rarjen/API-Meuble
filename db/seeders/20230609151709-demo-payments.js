"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Payments",
      [
        {
          payment: "COD",
          rekening: "",
          img_url: "https://ik.imagekit.io/6v306xm58/picture_KpzEkx4c9P",
          imagekit_id: "6477632e06370748f2ce4a99",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          payment: "Transfer Bank BCA",
          rekening: "8715212427",
          img_url: "https://ik.imagekit.io/6v306xm58/picture_RoVqYHTHo",
          imagekit_id: "647763a406370748f2d0ad0d",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payments", null, {});
  },
};

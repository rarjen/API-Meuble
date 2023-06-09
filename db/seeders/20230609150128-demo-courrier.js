"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Courriers",
      [
        {
          courrier: "Internal Delivery",
          img_url: "https://ik.imagekit.io/6v306xm58/picture_V80ZBrQQ0",
          imagekit_id: "6477619006370748f2c9478b",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courrier: "JNE",
          img_url: "https://ik.imagekit.io/6v306xm58/picture_UMj90qz4F",
          imagekit_id: "6477621806370748f2cab03f",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courrier: "TIKI",
          img_url: "https://ik.imagekit.io/6v306xm58/picture_FK9P6DhDx",
          imagekit_id: "6477629406370748f2cca005",
          status: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Courriers", null, {});
  },
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CategoryMenus",
      [
        {
          nama: "Fries",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Grilled",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Steamed",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Beverage",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CategoryMenus", null, {});
  },
};

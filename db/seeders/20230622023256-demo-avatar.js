"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Avatars",
      [
        {
          user_id: 1,
          img_url:
            "https://ik.imagekit.io/6v306xm58/picture_5R4Eakrio?updatedAt=1685285054104",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Avatars", null, {});
  },
};

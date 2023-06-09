"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const encrypted = await bcrypt.hash("qwerty123", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          role_id: 2,
          first_name: "Admin",
          last_name: "Meuble",
          email: "admin1@gmail.com",
          password: encrypted,
          mobile: "085329447621",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

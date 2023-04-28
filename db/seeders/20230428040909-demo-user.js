"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const encrypted = await bcrypt.hash("qwerty123", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          role_id: 2,
          first_name: "Admin",
          last_name: "Meuble",
          email: "admin1@gmail.com",
          password: encrypted,
          mobile: null,
          address: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          role_id: 3,
          first_name: "Otniel",
          last_name: "Kevin",
          email: "otnielkevin.ok@gmai.com",
          password: encrypted,
          mobile: null,
          address: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          role_id: 3,
          first_name: "Arjen",
          last_name: "Robben",
          email: "rarjen57@@gmai.com",
          password: encrypted,
          mobile: "085329447621",
          address: "Semarang Indonesia",
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

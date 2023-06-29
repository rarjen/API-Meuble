"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Materials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      material: {
        type: Sequelize.STRING,
      },
      panjang: {
        type: Sequelize.DOUBLE,
      },
      lebar: {
        type: Sequelize.DOUBLE,
      },
      tebal: {
        type: Sequelize.DOUBLE,
      },
      harga: {
        type: Sequelize.DOUBLE,
      },
      berat: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Materials");
  },
};

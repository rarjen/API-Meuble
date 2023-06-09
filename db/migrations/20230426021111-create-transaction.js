"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      invoice_number: {
        type: Sequelize.STRING,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      note: {
        type: Sequelize.TEXT,
      },
      courrier_id: {
        type: Sequelize.INTEGER,
      },
      service: {
        type: Sequelize.STRING,
      },
      payment_id: {
        type: Sequelize.INTEGER,
      },
      total_weight: {
        type: Sequelize.DOUBLE,
      },
      total: {
        type: Sequelize.DOUBLE,
      },
      ongkir: {
        type: Sequelize.DOUBLE,
      },
      grandTotal: {
        type: Sequelize.DOUBLE,
      },
      nomerResi: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      statusTransaction: {
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
    await queryInterface.dropTable("Transactions");
  },
};

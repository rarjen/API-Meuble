"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaction_custom_orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      courrier_id: {
        type: Sequelize.INTEGER,
      },
      payment_id: {
        type: Sequelize.INTEGER,
      },
      size_id: {
        type: Sequelize.INTEGER,
      },
      material_id: {
        type: Sequelize.INTEGER,
      },
      invoice_number: {
        type: Sequelize.STRING,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      note: {
        type: Sequelize.TEXT,
      },
      service: {
        type: Sequelize.STRING,
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
      statusOrder: {
        type: Sequelize.STRING,
      },
      statusPayment: {
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
    await queryInterface.dropTable("Transaction_custom_orders");
  },
};

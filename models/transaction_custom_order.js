"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_custom_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /**/
    }
  }
  Transaction_custom_order.init(
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      courrier_id: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      material_id: DataTypes.INTEGER,
      invoice_number: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      service: DataTypes.STRING,
      total_weight: DataTypes.DOUBLE,
      total: DataTypes.DOUBLE,
      ongkir: DataTypes.DOUBLE,
      grandTotal: DataTypes.DOUBLE,
      nomerResi: DataTypes.STRING,
      statusOrder: DataTypes.STRING,
      statusOrder: DataTypes.STRING,
      statusPayment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction_custom_order",
    }
  );
  return Transaction_custom_order;
};

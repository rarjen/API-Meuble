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
      // define association here
    }
  }
  Transaction_custom_order.init(
    {
      user_id: DataTypes.INTEGER,
      custom_order_id: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction_custom_order",
    }
  );
  return Transaction_custom_order;
};

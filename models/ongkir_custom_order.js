"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ongkir_custom_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ongkir_custom_order.init(
    {
      transaction_custom_order_id: DataTypes.INTEGER,
      ongkir: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Ongkir_custom_order",
    }
  );
  return Ongkir_custom_order;
};

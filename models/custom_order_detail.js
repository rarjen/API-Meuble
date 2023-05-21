"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Custom_order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Custom_order_detail.belongsTo(models.Custom_order, {
        foreignKey: "custom_order_id",
        as: "custom_order",
      });
    }
  }
  Custom_order_detail.init(
    {
      custom_order_id: DataTypes.INTEGER,
      total_weight: DataTypes.DOUBLE,
      price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Custom_order_detail",
    }
  );
  return Custom_order_detail;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderUser.hasMany(models.OrderUserItem, {
        foreignKey: "user_order_id",
        as: "order_user_item",
      });
    }
  }
  OrderUser.init(
    {
      username: DataTypes.STRING,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderUser",
    }
  );
  return OrderUser;
};

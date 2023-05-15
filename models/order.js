"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasOne(models.Order_detail, {
        foreignKey: "order_id",
        as: "order_detail",
      });

      Order.hasOne(models.Transaction, {
        foreignKey: "order_id",
        as: "transaction",
      });

      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Order.belongsToMany(models.Payment, {
        through: models.Transaction,
        foreignKey: "order_id",
        as: "payment",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};

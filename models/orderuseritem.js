"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderUserItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderUserItem.belongsTo(models.OrderUser, {
        foreignKey: "user_order_id",
        as: "order_user",
      });
    }
  }
  OrderUserItem.init(
    {
      order_user_id: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      catatan: DataTypes.STRING,
      harga: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderUserItem",
    }
  );
  return OrderUserItem;
};

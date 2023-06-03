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
      Transaction_custom_order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Transaction_custom_order.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
      Transaction_custom_order.belongsTo(models.Material, {
        foreignKey: "material_id",
        as: "material",
      });
      Transaction_custom_order.belongsTo(models.Size, {
        foreignKey: "size_id",
        as: "size",
      });
      Transaction_custom_order.belongsTo(models.Payment, {
        foreignKey: "payment_id",
        as: "payment",
      });
      Transaction_custom_order.belongsTo(models.Courrier, {
        foreignKey: "courrier_id",
        as: "courrier",
      });
      Transaction_custom_order.hasOne(models.Image_transaction_custom_order, {
        foreignKey: "transaction_custom_order_id",
        as: "img_transaction",
      });
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

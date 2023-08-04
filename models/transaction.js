"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Transaction.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });

      Transaction.belongsTo(models.Courrier, {
        foreignKey: "courrier_id",
        as: "courrier",
      });
      Transaction.belongsTo(models.Payment, {
        foreignKey: "payment_id",
        as: "payment",
      });
      Transaction.hasOne(models.Image_transaction, {
        foreignKey: "transaction_id",
        as: "img_transaction",
      });
      Transaction.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
      Transaction.belongsTo(models.Size, {
        foreignKey: "size_id",
        as: "size",
      });
      Transaction.belongsTo(models.Material, {
        foreignKey: "material_id",
        as: "material",
      });
      Transaction.hasOne(models.Reference_img, {
        foreignKey: "transaction_id",
        as: "reference_img",
      });
    }
  }
  Transaction.init(
    {
      user_id: DataTypes.INTEGER,
      invoice_number: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      payment_id: DataTypes.INTEGER,
      courrier_id: DataTypes.INTEGER,
      service: DataTypes.STRING,
      total_weight: DataTypes.DOUBLE,
      total: DataTypes.DOUBLE,
      ongkir: DataTypes.DOUBLE,
      grandTotal: DataTypes.DOUBLE,
      nomerResi: DataTypes.STRING,
      status: DataTypes.STRING,
      statusTransaction: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      material_id: DataTypes.INTEGER,
      ongkosTukang: DataTypes.DOUBLE,
      statusOrder: DataTypes.STRING,
      statusPayment: DataTypes.STRING,
      orderType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

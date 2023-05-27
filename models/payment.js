"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsToMany(models.Custom_order, {
        foreignKey: "payment_id",
        as: "custom_order",
        through: models.Transaction_custom_order,
      });

      Payment.hasOne(models.Transaction, {
        foreignKey: "payment_id",
        as: "transaction",
      });
    }
  }
  Payment.init(
    {
      payment: DataTypes.STRING,
      img_url: DataTypes.STRING,
      imagekit_id: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};

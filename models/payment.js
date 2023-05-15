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
      Payment.belongsToMany(models.Order, {
        foreignKey: "payment_id",
        as: "order",
        through: models.Transaction,
      });
    }
  }
  Payment.init(
    {
      payment: DataTypes.STRING,
      img_url: DataTypes.STRING,
      imagekit_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};

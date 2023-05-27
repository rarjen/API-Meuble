"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rekening extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rekening.belongsTo(models.Payment, {
        foreignKey: "payment_id",
        as: "payment",
      });
    }
  }
  Rekening.init(
    {
      payment_id: DataTypes.INTEGER,
      rekening: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rekening",
    }
  );
  return Rekening;
};

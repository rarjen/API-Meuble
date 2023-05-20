"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ongkir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ongkir.init(
    {
      transaction_id: DataTypes.INTEGER,
      ongkir: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Ongkir",
    }
  );
  return Ongkir;
};

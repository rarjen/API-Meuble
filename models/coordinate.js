"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coordinate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coordinate.belongsTo(models.Address, {
        foreignKey: "address_id",
        as: "address",
      });
    }
  }
  Coordinate.init(
    {
      address_id: DataTypes.INTEGER,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Coordinate",
    }
  );
  return Coordinate;
};

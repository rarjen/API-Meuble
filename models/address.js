"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.Province, {
        foreignKey: "province_id",
        as: "province",
      });
      Address.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
    }
  }
  Address.init(
    {
      user_id: DataTypes.INTEGER,
      province_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};

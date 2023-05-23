"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.belongsTo(models.Province, {
        foreignKey: "province_id",
        as: "province_name",
      });
      City.hasOne(models.Address, {
        foreignKey: "city_id",
        as: "address",
      });
    }
  }
  City.init(
    {
      province_id: DataTypes.INTEGER,
      province: DataTypes.STRING,
      type: DataTypes.STRING,
      city_name: DataTypes.STRING,
      postal_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Province.hasOne(models.Address, {
        foreignKey: "province_id",
        as: "address",
      });
      Province.hasMany(models.City, {
        foreignKey: "province_id",
        as: "city",
      });
    }
  }
  Province.init(
    {
      province: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Province",
    }
  );
  return Province;
};

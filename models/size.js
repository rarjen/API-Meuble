"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Size.hasMany(models.Transaction_custom_order, {
        foreignKey: "size_id",
        as: "transaction_custom",
      });
    }
  }
  Size.init(
    {
      panjang: DataTypes.DOUBLE,
      lebar: DataTypes.DOUBLE,
      tinggi: DataTypes.DOUBLE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};

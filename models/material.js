"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Material.hasMany(models.Transaction_custom_order, {
        foreignKey: "material_id",
        as: "transaction_custom",
      });
    }
  }
  Material.init(
    {
      material: DataTypes.STRING,
      panjang: DataTypes.DOUBLE,
      lebar: DataTypes.DOUBLE,
      tebal: DataTypes.DOUBLE,
      harga: DataTypes.DOUBLE,
      berat: DataTypes.DOUBLE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Material",
    }
  );
  return Material;
};

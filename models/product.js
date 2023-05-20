"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      nama: DataTypes.STRING,
      weight: DataTypes.DOUBLE,
      deskripsi: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      harga: DataTypes.DOUBLE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

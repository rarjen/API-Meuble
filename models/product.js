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
      // define association here
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      nama: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      harga: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

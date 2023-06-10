"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_rating extends Model {
    static associate(models) {
      Product_rating.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });

      Product_rating.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Product_rating.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      transaction_id: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Product_rating",
    }
  );
  return Product_rating;
};

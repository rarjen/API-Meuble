"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "category_id",
        as: "product",
      });

      Category.hasMany(models.Size, {
        foreignKey: "category_id",
        as: "size",
      });

      Category.hasMany(models.Material, {
        foreignKey: "category_id",
        as: "material",
      });

      Category.hasMany(models.Custom_order, {
        foreignKey: "category_id",
        as: "custom_order",
      });
    }
  }
  Category.init(
    {
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

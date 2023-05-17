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
      Size.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      Size.hasMany(models.Custom_order, {
        foreignKey: "size_id",
        as: "custom_order",
      });
    }
  }
  Size.init(
    {
      category_id: DataTypes.INTEGER,
      size: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};

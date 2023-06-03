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
      Material.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      Material.hasMany(models.Transaction_custom_order, {
        foreignKey: "material_id",
        as: "transaction_custom",
      });
    }
  }
  Material.init(
    {
      category_id: DataTypes.INTEGER,
      material: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Material",
    }
  );
  return Material;
};

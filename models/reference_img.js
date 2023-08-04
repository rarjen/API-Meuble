"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reference_img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reference_img.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
        as: "transaction",
      });
    }
  }
  Reference_img.init(
    {
      transaction_id: DataTypes.INTEGER,
      img_url: DataTypes.STRING,
      imagekit_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Reference_img",
    }
  );
  return Reference_img;
};

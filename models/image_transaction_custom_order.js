"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image_transaction_custom_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image_transaction_custom_order.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
        as: "transaction",
      });
    }
  }
  Image_transaction_custom_order.init(
    {
      transaction_id: DataTypes.INTEGER,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image_transaction_custom_order",
    }
  );
  return Image_transaction_custom_order;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image_transaction.init({
    transaction_id: DataTypes.INTEGER,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image_transaction',
  });
  return Image_transaction;
};
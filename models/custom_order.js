'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custom_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Custom_order.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER,
    color_id: DataTypes.INTEGER,
    material_id: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Custom_order',
  });
  return Custom_order;
};
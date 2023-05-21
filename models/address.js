'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    user_id: DataTypes.INTEGER,
    province_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
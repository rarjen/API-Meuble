'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rekening extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rekening.init({
    payment_id: DataTypes.INTEGER,
    rekening: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rekening',
  });
  return Rekening;
};
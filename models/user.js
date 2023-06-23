"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });

      User.hasMany(models.Transaction, {
        foreignKey: "user_id",
        as: "transaction",
      });

      User.hasMany(models.Transaction_custom_order, {
        foreignKey: "user_id",
        as: "transaction_custom",
      });

      User.hasOne(models.Address, {
        foreignKey: "user_id",
        as: "address",
      });

      User.hasMany(models.Product_rating, {
        foreignKey: "user_id",
        as: "product_rating",
      });

      User.hasOne(models.Avatar, {
        foreignKey: "user_id",
        as: "avatar",
      });
    }
  }
  User.init(
    {
      role_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

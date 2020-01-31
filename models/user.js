"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      wallet_id: DataTypes.UUID
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.CoupleAccount, {
      through: "user_accounts",
      as: "Accounts",
      foreignKey: "UserId"
    });
    User.hasOne(models.Wallet, {
      as: "Wallet",
      foreignKey: "user_id"
    });
  };
  return User;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const CoupleAccount = sequelize.define(
    "CoupleAccount",
    {
      name: DataTypes.STRING
    },
    {}
  );
  CoupleAccount.associate = function(models) {
    CoupleAccount.belongsToMany(models.User, {
      through: "user_accounts",
      as: "Users",
      foreignKey: "CoupleId"
    });
  };

  return CoupleAccount;
};

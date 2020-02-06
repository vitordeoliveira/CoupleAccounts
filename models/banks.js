"use strict";
module.exports = (sequelize, DataTypes) => {
  const Banks = sequelize.define(
    "Banks",
    {
      name: DataTypes.STRING,
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      }
    },
    {}
  );
  Banks.associate = function(models) {
    Banks.belongsTo(models.Wallet, {
      foreignKey: "wallet_id"
    });
  };
  return Banks;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Banks = sequelize.define(
    "Banks",
    {
      name: DataTypes.STRING,
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      taxesDecimal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      taxesPercentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      interest: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      yieldDecimal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      yieldPercentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      hooks: {
        beforeCreate: (bank, opt) => {
          bank.interest = bank.interest / 100;
          bank.yieldPercentage = bank.yieldPercentage / 100;
          bank.taxesPercentage = bank.taxesPercentage / 100;
        }
      }
    }
  );
  Banks.associate = function(models) {
    Banks.belongsTo(models.Wallet, {
      foreignKey: "wallet_id"
    });
  };
  return Banks;
};

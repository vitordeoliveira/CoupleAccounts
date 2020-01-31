const uuid = require("uuid/v4");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {},
    {
      hooks: {
        beforeCreate: (wallet, opt) => {
          wallet.id = uuid();
        }
      }
    }
  );
  Wallet.associate = function(models) {
    Wallet.belongsTo(models.User, { foreignKey: "user_id" });
    Wallet.hasMany(models.Banks, { foreignKey: "wallet_id", as: "Banks" });
  };
  return Wallet;
};

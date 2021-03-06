"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "wallet_id", {
      type: Sequelize.UUID,
      references: { model: "Wallets", key: "id" },
      after: "id",
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "wallet_id");
  }
};

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Banks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wallet_id: {
        type: Sequelize.UUID,
        references: { model: "Wallets", key: "id" },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2)
      },
      taxesDecimal: {
        type: Sequelize.DECIMAL(10, 2)
      },
      taxesPercentage: {
        type: Sequelize.INTEGER
      },
      interest: {
        type: Sequelize.INTEGER
      },
      yieldDecimal: {
        type: Sequelize.DECIMAL(10, 2)
      },
      yieldPercentage: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Banks");
  }
};

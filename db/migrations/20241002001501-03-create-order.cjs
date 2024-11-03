"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
          key: "id",
        },
        onDelete: "RESTRICT",
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["recebido", "em_preparacao", "pronto", "finalizado"],
        allowNull: false,
        defaultValue: "recebido",
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      order_number: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("orders");
  },
};

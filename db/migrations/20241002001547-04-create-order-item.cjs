"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("order_items", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "RESTRICT",
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "RESTRICT",
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    await queryInterface.dropTable("order_items");
  },
};

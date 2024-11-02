"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM,
        values: ["lanche", "acompanhamento", "bebida", "sobremesa", "outros"],
        defaultValue: "outros",
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable("products"),
      queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_product_category";'
      );
  },
};

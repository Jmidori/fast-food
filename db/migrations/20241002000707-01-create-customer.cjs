"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable("customers");
  },
};

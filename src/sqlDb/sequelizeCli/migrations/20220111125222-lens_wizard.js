'use strict';

const DB_NAME = 'lens_wizard';
const getColumns = (Sequelize) => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  name: {
    type: Sequelize.STRING,
  },
});
const getSeeds = () => [
  {
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    name: 'lens_wizard1',
  },
  {
    id: 2,
    created_at: new Date(),
    updated_at: new Date(),
    name: 'lens_wizard2',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(DB_NAME, getColumns(Sequelize));
    await queryInterface.bulkInsert(DB_NAME, getSeeds());
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete(DB_NAME, null, {});
    await queryInterface.dropTable(DB_NAME);
  },
};

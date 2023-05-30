const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Theater = sequelize.define('theater', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  module.exports = Theater;
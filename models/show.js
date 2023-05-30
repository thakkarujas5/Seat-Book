const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Show = sequelize.define('show', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  
  module.exports = Show;
const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Booking = sequelize.define('booking', {
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    theaterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  module.exports = Booking;
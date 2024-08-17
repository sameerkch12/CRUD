const { DataTypes } = require('sequelize');
const sequelize = require('./index');

// Define the Contact model
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Contact;

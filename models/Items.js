const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    purchase_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
         
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    purchase_from: {
      type: DataTypes.STRING,
      allowNull: false
    }
},
  {
    sequelize,
    freezeTableName: false,
    modelName: 'item',
  },
  
);

module.exports = Item;

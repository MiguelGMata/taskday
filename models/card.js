'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      this.belongsTo(models.List, {
        foreignKey: "listId",
      });
    }
  }
  Card.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};

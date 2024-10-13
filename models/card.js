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
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Para asegurarse de que las tarjetas tengan un valor por defecto
      }
    }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};

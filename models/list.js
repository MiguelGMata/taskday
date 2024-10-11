'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      this.belongsTo(models.Task, {
        foreignKey: "taskId",
      });
      this.hasMany(models.Card, {
        foreignKey: "listId",
        onDelete: 'CASCADE',
      });
    }
  }
  List.init(
    {
      title: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};

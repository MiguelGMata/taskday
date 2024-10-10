'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: "user" });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.STRING,
      date: DataTypes.DATE
    }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
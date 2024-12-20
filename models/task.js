'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.hasMany(models.List, {
        foreignKey: "taskId",
        onDelete: 'CASCADE',
      });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};

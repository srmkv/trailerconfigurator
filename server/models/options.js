// server/models/option.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    static associate(models) {
      // Связь "многие ко многим" с моделью Trailer через таблицу TrailerOptions
      this.belongsToMany(models.Trailer, {
        through: 'TrailerOptions',
        foreignKey: 'optionId',  // Правильное имя внешнего ключа
        otherKey: 'trailerId',     // Правильное имя внешнего ключа
      });
    }
  }
  Option.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
    type: DataTypes.FLOAT, // Или DataTypes.DECIMAL, в зависимости от требований
    allowNull: false,
    defaultValue: 0
  },
  image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Option',
    tableName: 'Options',
    timestamps: false,
  });
  return Option;
};

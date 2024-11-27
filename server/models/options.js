'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    static associate(models) {
      // Связь "многие ко многим" с моделью Trailer через таблицу TrailerOptions
      this.belongsToMany(models.Trailer, {
        through: 'TrailerOptions',
        foreignKey: 'optionId',
        otherKey: 'trailerId',
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
      type: DataTypes.DECIMAL(10, 2), // Изменено на DECIMAL
      allowNull: false,
      defaultValue: 0.00
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Backimage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poryadok: { // Новое поле для порядка наложения
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    position: { // Новое поле для порядка наложения
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
     positionBack: { // Новое поле для порядка наложения
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Option',
    tableName: 'Options',
    timestamps: false,
  });
  
  return Option;
};

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TrailerOption extends Model {}

  TrailerOption.init({
    trailerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Trailers',
        key: '_id'  // Убедитесь, что это правильный ключ
      },
      primaryKey: true  // Включаем в составной первичный ключ
    },
    optionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Options',
        key: 'id'  // Убедитесь, что это правильный ключ
      },
      primaryKey: true  // Включаем в составной первичный ключ
    }
  }, {
    sequelize,
    modelName: 'TrailerOption',
    tableName: 'TrailerOptions',
    timestamps: false,
  });

  return TrailerOption;
};

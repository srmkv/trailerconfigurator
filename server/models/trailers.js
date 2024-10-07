'use strict';
const { Model } = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
  class Trailer extends Model {
    static associate(models) {
      // Связь "многие ко многим" с моделью Option через таблицу TrailerOptions
      this.belongsToMany(models.Option, {
        through: 'TrailerOptions',
       foreignKey: 'trailerId',  // Правильное имя внешнего ключа
        otherKey: 'optionId',     // Правильное имя внешнего ключа
      });
    }
  }
  Trailer.init({
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    Price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //белый
    FrontImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //зеленый
    FrontImgGreen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImgGreen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //изумрудный
    FrontImgIzu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImgIzu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //красный
    FrontImgRed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImgRed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //серый
    FrontImgGray: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImgGray: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //синий
    FrontImgBlue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImgBlue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //хакки
    FrontImgHaki: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImgHaki: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //черный
    FrontImgBlack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImgBlack: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    
  }, {
    sequelize,
    modelName: 'Trailer',
    tableName: 'Trailers',
    timestamps: false,
  });
  return Trailer;
};
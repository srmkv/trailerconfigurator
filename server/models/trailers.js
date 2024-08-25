'use strict';
const { Model } = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
  class Trailer extends Model {
  
  };
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
    FrontImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BackImg: {
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
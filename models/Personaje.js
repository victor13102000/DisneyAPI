const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Personage extends Model {}

Personage.init(
  {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    history: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mediaAssociated: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {

    sequelize: db, 
    modelName: "Personage", 
  }
);
module.exports= Personage;

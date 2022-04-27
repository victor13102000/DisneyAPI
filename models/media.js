const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Media extends Model {}

Media.init(
  {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateCreate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    qualification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    associatedCharacters: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  },
  {
   
    sequelize: db, 
    modelName: "Media", 
  }
);

module.exports= Media;
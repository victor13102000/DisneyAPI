const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class   Gender extends Model {}

Gender.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    associatedMedia: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Gender",
  }
);

module.exports= Gender;
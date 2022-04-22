const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt"); 

class User extends Model {
    hash(password, salt) {
        return bcrypt.hash(password, salt);
      }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha:{
          msg: 'the name can only contain letters'
        },
        len:{
          args:[2,255],
          msg:"the name can have at least two characters"
        }
      }
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
          type: DataTypes.STRING,
          validate:{
            len:{
              args:[8,255],
              msg:"the password must contain at least eight characters"
            }
          }
      },
      salt: {
        type: DataTypes.STRING,
      }, 
  },
  {
    sequelize: db,
    modelName: "Users",
  }
);

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(1);
    const hash = await user.hash(user.password, salt);
    user.salt = salt;
    user.password = hash;
  });

  module.exports= User;
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  
  user.init({
    id: DataTypes.UUID,
    kid: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    phone: DataTypes.STRING,
    college: DataTypes.STRING,
    year: DataTypes.INTEGER,
    dept: DataTypes.STRING,
    pwdhash: DataTypes.STRING,
    cegian: DataTypes.BOOLEAN,
    salt: DataTypes.STRING,
    vsalt: DataTypes.STRING,
    roll: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};

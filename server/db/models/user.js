const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Stream, {foreignKey : 'user_id'});
      this.hasMany(models.View, {foreignKey : 'user_id'});
      this.hasMany(models.Message, {foreignKey : 'user_id'});
      this.hasMany(models.Comment, {foreignKey : 'user_id'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    stream_key: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

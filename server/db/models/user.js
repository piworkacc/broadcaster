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
    static associate({ Game }) {
      this.belongsTo(Game, { foreignKey: 'id' });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    userEmail: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

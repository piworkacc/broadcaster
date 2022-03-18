'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey : 'user_id'});
      this.belongsTo(models.Stream, {foreignKey : 'stream_id'});
    }
  }
  View.init({
    user_id: DataTypes.INTEGER,
    stream_id: DataTypes.INTEGER,
    time_joined: DataTypes.DATE,
    time_left: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'View',
  });
  return View;
};

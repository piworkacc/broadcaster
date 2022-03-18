'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey : 'user_id'});
      this.hasMany(models.View, {foreignKey : 'stream_id'});
      this.belongsToMany(models.Tag, { through: 'StreamTags', foreignKey: 'stream_id' });
      this.hasMany(models.Message, {foreignKey : 'stream_id'});
      this.hasMany(models.Comment, {foreignKey : 'stream_id'});
      this.hasMany(models.Like, {foreignKey : 'stream_id'});
    }
  }
  Stream.init({
    user_id: DataTypes.INTEGER,
    broadcast_id: DataTypes.STRING,
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    path: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Stream',
  });
  return Stream;
};

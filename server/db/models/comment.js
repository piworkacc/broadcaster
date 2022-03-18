'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey : 'user_id'});
      this.belongsTo(models.Stream, {foreignKey : 'stream_id'});
      this.belongsTo(models.Comment, {foreignKey : 'comment_id'});
      this.hasMany(models.Comment, {foreignKey : 'comment_id'});
      this.hasMany(models.Like, {foreignKey : 'comment_id'});
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    stream_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};

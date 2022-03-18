'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StreamTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StreamTag.init({
    tag_id: DataTypes.INTEGER,
    stream_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StreamTag',
  });
  return StreamTag;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attribute.init({
    attribute_name: DataTypes.STRING,
    attribute_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'attribute',
  });
  return attribute;
};
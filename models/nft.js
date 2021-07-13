'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NFT.hasMany(models.attribute)
      models.attribute.belongsTo(NFT);
      
    }
  };
  NFT.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    isMinted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'NFT',
  });
  return NFT;
};

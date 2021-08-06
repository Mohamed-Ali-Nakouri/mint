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
      
    }
  };
  NFT.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    background: DataTypes.STRING,
    body: DataTypes.STRING,
    mouth: DataTypes.STRING,
    eyes: DataTypes.STRING,
    head_gear: DataTypes.STRING,
    tokenId: DataTypes.STRING,
    image: DataTypes.STRING,
    isMinted: DataTypes.BOOLEAN
  }, { hooks: {
    beforeCreate: (nft) => {
      nft.isMinted = false
    },
  },
    sequelize,
    modelName: 'NFT',
  });
  return NFT;
};
const models = require("../../models/index");
const path = require("path");
const fs = require("fs");

module.exports = {
  create_nft: async (req, res, next) => {
    try {
      const dir = path.resolve(__dirname + `../../../data/traitsfinal.json`);
      const readCards = fs.readFileSync(dir, "utf8");

      const parsed = JSON.parse(readCards);
      console.log("ya data ha final ??", parsed);
      parsed.forEach(async (item) => {
        // return res.json(item)
        let newNft = await models.NFT.create({
          name: item.Name,
          description: item.Description,
          background: item.Background,
          body: item.Body,
          mouth: item.Mouth,
          eyes: item.Eyes,
          head_gear: item.Head_Gear,
          tokenId: item.tokenId,
          image: item.imagesIPFS,
        });
      });

      return res.json({
        data: "nft created",
        error: null,
        success: true,
      });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },

  get_nft: async (req, res, next) => {
    try {
      const { id } = req.params;
      // console.log("id ?????????",id)
      // console.log("type of  ",typeof(id))
      // const n=Number(id)
      // console.log("type of  ",typeof(id))
      const nft = await models.NFT.findByPk(id);

      if (!nft) {
        throw new Error("Token ID invalid");
      }

      if (!nft.isMinted) {
        throw new Error("Token not minted");
      }

      // }
      const resObj = {
        name: nft.name,
        description: nft.description,
        image: `https://gateway.pinata.cloud/ipfs/${nft.image}`,
        attributes: [
          { trait_type: "background", value: `${nft.background}` },
          { trait_type: "body", value: `${nft.body}` },
          { trait_type: "mouth", value: `${nft.mouth}` },
          { trait_type: "eyes", value: `${nft.eyes}` },
          { trait_type: "tokenId", value: `${nft.tokenId}` },
          {
            display_type: "number",
            trait_type: "Serial No.",
            value: id,
            max_value: 1000,
          },
        ],
      };

      return res.json(resObj);
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
  mint: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updated = await models.NFT.findByPk(id);

      if (!updated) {
        throw new Error("NFT ID invalid");
      }
      if (updated.isMinted) {
        throw new Error("NFT Already minted");
      }
      updated.isMinted = true;
      updated.save();

      return res.json({
        data: "Token minted successfully",
        error: null,
        success: true,
      });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};

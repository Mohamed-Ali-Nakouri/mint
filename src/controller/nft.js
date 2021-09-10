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
        const data = parsed.map(item => {
          return models.NFT.create({
             name: item.Name,
             description: item.Description,
             background: item.Background,
             body: item.Body,
             mouth: item.Mouth,
             eyes: item.Eyes,
             head_gear: item.Head_Gear,
             tokenId: item.tokenId,
             image: item.imagesIPFS,
           })
       })
   
       const results = await Promise.all(data)
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
      console.log(nft);
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
  get_nft_all: async (req, res, next) => {
    try {
      // console.log("id ?????????",id)
      // console.log("type of  ",typeof(id))
      // const n=Number(id)
      // console.log("type of  ",typeof(id))
      const nft = await models.NFT.findAndCountAll({
        limit: 10
      });
      // console.log(nft);
      if (!nft) {
        throw new Error("Token ID invalid");
      }

      // if (nft.isMinted) {
      //   throw new Error("Token not minted");
      // }
      // console.log(nft);
      // }
        var resObjarr = [];
        for (var i = 0; i < nft.rows.length; i++) {
           resObj = {
            name: nft.rows[i].name,
            description: nft.rows[i].description,
            image: `https://gateway.pinata.cloud/ipfs/${nft.rows[i].image}`,
            attributes: [
              { trait_type: "background", value: `${nft.rows[i].background}` },
              { trait_type: "body", value: `${nft.rows[i].body}` },
              { trait_type: "mouth", value: `${nft.rows[i].mouth}` },
              { trait_type: "eyes", value: `${nft.rows[i].eyes}` },
              { trait_type: "tokenId", value: `${nft.rows[i].tokenId}` },
              {
                display_type: "number",
                trait_type: "Serial No.",
                value: nft.rows[i].id,
                max_value: 1000,
              },
            ],
          };
          resObjarr.push(resObj);
      }
      console.log(JSON.stringify(resObjarr))
      return res.json(resObjarr);
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

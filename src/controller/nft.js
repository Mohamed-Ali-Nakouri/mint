
const models = require("../../models/index");
module.exports = {
create_nft: async (req, res) => {
    try {
      
      
    for(let i = 1;i<7778;i++){
    
      let newNft = await models.NFT.create({
        name:`nft ${i}`,
        image: "https://www.google.com/search?q=dummy+nft+image&sxsrf=ALeKk00vO7UZoFnnkLQ5A6maqgQcg-tWJA:1624962423169&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjig4bg0LzxAhUozoUKHRRbDLIQ_AUoAXoECAEQBA&biw=1920&bih=898#imgrc=wLWMIrKEKVjWSM",
        description:"Very heavy token"
      });
    }
      

      return res.json({
        data: "nft created",
        error: null,
        success: true,
      });
    } catch (error) {
      console.log("server error", error);
      return res.status(500).json({
        data: null,
        error: "Server error",
        success: false,
      });
    }
  },

get_nft: async (req, res) => {
try {

    const {id} = req.params
    const nft = await models.NFT.findByPk(id)

      if(!nft){
        return res.json({
          data: null,
          error: "Token ID invalid",
          success: "false",
        });
      }

    if(!nft.isMinted){
        return res.json({
            data: null,
            error: "Token not minted",
            success: "false",
        });
    }
    
      
    return res.json({
        data: nft,
        error: null,
        success: true,
    });
    
  
} catch (error) {
    console.log("server error", error);
    return res.status(500).json({
    data: null,
    error: "Server error",
    success: false,
    });
}
},
}

const models = require("../../models/index");

module.exports = {
create_nft: async (req, res) => {
    try {
    
    let tier = ['Immortal','Peasant','God','Knight','Demi-God']
    let race = ['Human','Xor','Human','Undead','Orc']
    let clas = ['Marksman','Mage','Priest','Shaman','Paladin']
    let primary_trait = ['Fire','Blood','Earth','Light','Water']
    let secondary_trait = ['Fire','Water','Wind','Death','Light']
    
    for(let i = 1;i<6;i++){
      
      let newNft = await models.NFT.create({
        name:`TOG 000${i}`,
        image: "https://gateway.pinata.cloud/ipfs/Qmbi4KmjSruVC3cFH3Bx3D73JZaNg9ZL54sWbPbT97qs5S",
        description:'',
        tier:tier[i-1],
        race:race[i-1],
        class:clas[i-1],
        primary_trait:primary_trait[i-1],
        secondary_trait:secondary_trait[i-1]

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
    let supply
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
    supply  = await models.Supply.findByPk(1);
   
    const resObj = {
      name:nft.name,
      description:nft.description,
      image:nft.image,
      attributes:[
            {"trait_type":"Race","value":`${nft.race}`},
            {"trait_type":"Tier","value":`${nft.tier}`},
            {"trait_type":"Class","value":`${nft.class}`},
            {"trait_type":"Primary Trait","value":`${nft.primary_trait}`},
            {"trait_type":"Secondary Trait","value":`${nft.secondary_trait}`},
            {
              "display_type": "number",
              "trait_type": "Serial No.",
              "value":supply.current_supply,
              "max_value": 7777
            }
      ]


    }
      
    return res.json(resObj)
    
  
} catch (error) {
    console.log("server error", error);
    return res.status(500).json({
    data: null,
    error: "Server error",
    success: false,
    });
}
},
mint: async (req, res) => {
  try {
  
      const {id} = req.params;
      const updated = await models.NFT.update(

        { isMinted:true },
        {where:{ id : id }}  
      )
      const supply  = await models.Supply.findByPk(1);
      if(!supply){
        await models.Supply.create()
      }
      await models.Supply.increment({current_supply:+1},{where:{id:1}})

    
      return res.json({
          data: "Token minted successfully",
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

// {
//   "name":"[Silver] Lil Tron - #13 of 100",
//   "description":"",
//   "image":"https://gateway.pinata.cloud/ipfs/Qmbi4KmjSruVC3cFH3Bx3D73JZaNg9ZL54sWbPbT97qs5S",
//   "attributes":[
//     {"trait_type":"Tribe","value":"Purple"},
//     {"trait_type":"Tier","value":"Silver"},
//     {"display_type":"number","trait_type":"Total Available","value":13,"max_value":100},
//     {"display_type":"number","trait_type":"Serial No.","value":3,"max_value":60}
//   ]
// }

// "data": {
//   "id": 2,
//   "name": "TOG 0002",
//   "description": null,
//   "image": "https://gateway.pinata.cloud/ipfs/Qmbi4KmjSruVC3cFH3Bx3D73JZaNg9ZL54sWbPbT97qs5S",
//   "race": "Xor",
//   "tier": "Peasant",
//   "class": "Mage",
//   "primary_trait": "Blood",
//   "secondary_trait": "Water",
//   "isMinted": true,
//   "createdAt": "2021-06-30T07:36:48.833Z",
//   "updatedAt": "2021-06-30T10:35:13.042Z"
// },
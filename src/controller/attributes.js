
const models = require("../../models/index");
const attributeSchema = require('../schemas/attributeScehma');

module.exports = {
create_attribute: async (req, res) => {
    try {
        
        const {id} = req.params;
        let { attribute_name, attribute_value } = await attributeSchema.validateAsync(req.body);
        
        const nft = await models.NFT.findByPk(id);

        if(!nft){
            throw new Error("NFT ID invalid")
        }
        nft.createAttribute({
            attribute_name,
            attribute_value
        })

        return res.json({
            data: "attribute added",
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
update_attribute:async(req,res)=>{
    const {attribute_id}= req.params;
    const param = Object.keys(req.body);
        const updateBody = {};
        const allowedAttributes = ['attribute_name',"attribute_value",];
        param.forEach((i)=>{
          if(req.body[i] && allowedAttributes.includes(i)){
            updateBody[i]=req.body[i];
          }else{
              return res.json({
                  data: null,
                  error: "Please Provide Valid fields to update",
                  success: "false",
              });
          }
        })
        console.log('Update boduy :::',updateBody)
        let nftData = await models.attribute.findByPk(attribute_id);
        
  
        if (!nftData) {

          throw new Error("Token ID invaliddd")

        }
      
        let update = await nftData.update(updateBody);
        return res.json({
          data: update,
          error: null,
          success: true,
        });
}

}


const models = require("../../models/index");
const jwt = require('jsonwebtoken')
const {compareSync}= require('bcrypt')
const loginSchema = require('../schemas/admin_login')



module.exports = {

admin_login:async (req,res)=>{

    try {

        const body = await loginSchema.validateAsync(req.body);
        let { email, password } = body;

        let adminProfile = await models.admin.findOne({
          where:{email:email},
        });
        if (!adminProfile) {
          return res.status(401).json({
            data: null,
            error: "Invalid email or password",
            success: false,
          });
        }
  
        let payload = {
          id: adminProfile.id,
          isAdmin:true,
      
        };
  
        // compare password
        if (compareSync(password, adminProfile.password)) {
          const accessToken = await jwt.sign(payload,process.env.SECRET)
  
          return res.json({
            data: accessToken,
            error: null,
            success: true,
          });
        } else{
          return res.status(401).json({
            data: null,
            error: "Invalid email or password",
            success: false,
          });
        }
  }catch (error) {
      console.log("server error", error);
      return res.status(500).json({
        data: null,
        error: "Server error",
        success: false,
      });
    }

},

update_nft:async(req,res)=>{

try {
  const {isAdmin} = req;
  if(!isAdmin){
    return res.status(403).json({
        data:null,
        error:"Un-authorized or disabled accountt",
        success:false

    })
  }
   
  const {token_id}= req.params;
  const param = Object.keys(req.body);
      const updateBody = {};
      const allowedAttributes = ['name',"price","description","image","race","tier","class","primary_trait","secondary_trait"];
      param.forEach((i)=>{
        if(req.body[i] && allowedAttributes.includes(i)){
          updateBody[i]=req.body[i];
        }
      })
      console.log('Update boduy :::',updateBody)
      let token = await models.NFT.findByPk(token_id);
      

      if (!token) {
        return res.json({
          data: null,
          error: "Token ID Invalid",
          success: "false",
        });
      }
    
      let update = await token.update(updateBody);
      return res.json({
        data: update,
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



}



}
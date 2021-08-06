const models = require("../../models/index");
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
const loginSchema = require("../schemas/admin_login");

module.exports = {
  admin_login: async (req, res, next) => {
    try {
      const body = await loginSchema.validateAsync(req.body);
      let { email, password } = body;

      let adminProfile = await models.admin.findOne({
        where: { email: email },
      });
      if (!adminProfile) {
        throw new Error("Invalid email or password");
      }

      let payload = {
        id: adminProfile.id,
        isAdmin: true,
      };

      // compare password
      if (compareSync(password, adminProfile.password)) {
        const accessToken = await jwt.sign(payload, process.env.SECRET);

        return res.json({
          data: accessToken,
          error: null,
          success: true,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },

  update_nft: async (req, res, next) => {
    try {
      const { isAdmin } = req;
      if (!isAdmin) {
        throw new Error("Un-authorized or disabled accountt");
      }

      const { token_id } = req.params;
      const param = Object.keys(req.body);
      const updateBody = {};
      const allowedAttributes = [
        "name",
        "description",
        "background",
        "body",
        "mouth",
        "eyes",
        "head_gear",
        "tokenId",
        "imagesIPFS",
      ];
      param.forEach((i) => {
        if (req.body[i] && allowedAttributes.includes(i)) {
          updateBody[i] = req.body[i];
        } else {
          throw new Error("Please provide Valid fields to update");
        }
      });
      console.log("Update boduy :::", updateBody);
      let token = await models.NFT.findByPk(token_id);

      if (!token) {
        throw new Error("Token ID Invalid");
      }

      let update = await token.update(updateBody);
      return res.json({
        data: update,
        error: null,
        success: true,
      });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};

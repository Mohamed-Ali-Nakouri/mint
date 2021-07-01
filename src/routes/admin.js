const router = require("express").Router();
const auth = require('../middleware/auth')

const {
    admin_login,
    update_nft

} = require("../controller/admin");


router.post(
  "/login",
  admin_login
);

router.put(
    "/update-nft/:token_id",auth,
    update_nft
);

update_nft
module.exports = router;
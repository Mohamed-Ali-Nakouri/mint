const router = require("express").Router();

const {
    create_nft,
    get_nft

} = require("../controller/nft");
router.post(
  "/create",
  create_nft
);


router.get(
    "/metadata/:id",
    get_nft
);


module.exports = router;
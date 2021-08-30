const router = require("express").Router();
const auth=require("../middleware/auth")


const {
    create_nft,
    get_nft,
    get_nft_all,
    mint

} = require("../controller/nft");
router.post(
  "/create",
  create_nft
);


router.get(
    "/metadata/:id",
    get_nft
);

router.get(
    "/metadata",
    get_nft_all
);

router.put(
  "/mint/:id",
  mint
);


module.exports = router;
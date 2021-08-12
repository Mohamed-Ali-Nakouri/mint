const router = require("express").Router();

const {
    create_attribute,
    update_attribute

} = require("../controller/attributes");


router.post(
  "/create-attribute/:id",
  create_attribute
);


router.put(
  "/update-attribute/:attribute_id",
  update_attribute
);


module.exports = router;
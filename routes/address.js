const router = require("express").Router();
const address = require("../controllers/address");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post(
  "/create-address",
  authorize(ROLES.BUYER, ROLES.ADMIN),
  address.createAddressUser
);
router.put(
  "/edit-address/:address_id",
  authorize(ROLES.BUYER, ROLES.ADMIN),
  address.updateAddressUser
);
router.get("/address", authorize(ROLES.BUYER, ROLES.ADMIN), address.getAddress);

module.exports = router;

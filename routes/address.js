const router = require("express").Router();
const address = require("../controllers/address");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/createAddress", authorize(), address.createAddressUser);
router.get("/", authorize([ROLES.ADMIN, ROLES.BUYER]), address.getAddress);

module.exports = router;

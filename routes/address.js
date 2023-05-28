const router = require("express").Router();
const address = require("../controllers/address");
const authorize = require("../middlewares/authorize");

router.post("/create-address", authorize(), address.createAddressUser);
router.get("/", authorize(), address.getAddress);

module.exports = router;

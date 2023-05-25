const router = require("express").Router();
const address = require("../controllers/address");
const authorize = require("../middlewares/authorize");

router.post("/create-address", authorize(), address.createAddressUser);
router.put("/edit-address/:address_id", authorize(), address.updateAddressUser);
router.get("/", authorize(), address.getAddress);

module.exports = router;

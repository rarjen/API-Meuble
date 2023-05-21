const router = require("express").Router();
const user = require("../controllers/user");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/", authorize(ROLES.ADMIN), user.index);
router.put("/update-bio", authorize(), user.createBio);
router.put("/reset-password", authorize(), user.resetPasswordUser);
router.post("/create-address", authorize(), user.createAddressUser);
router.put("/edit-address/:address_id", authorize(), user.updateAddressUser);
router.get("/address", authorize(), user.getAddress);

module.exports = router;

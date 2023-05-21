const router = require("express").Router();
const user = require("../controllers/user");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/", authorize(ROLES.ADMIN), user.index);
router.put("/update-bio", authorize(), user.createBio);
router.put("/reset-password", authorize(), user.resetPasswordUser);
router.put("/address", authorize(), user.createAddressUser);
router.put("/address/:address_id", authorize(), user.updateAddressUser);

module.exports = router;

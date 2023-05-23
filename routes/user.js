const router = require("express").Router();
const user = require("../controllers/user");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/all-users", authorize(ROLES.ADMIN), user.index);
router.put("/update-bio", authorize(), user.createBio);
router.put("/reset-password", authorize(), user.resetPasswordUser);

module.exports = router;

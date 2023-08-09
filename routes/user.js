const router = require("express").Router();
const user = require("../controllers/user");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/all-users", authorize(ROLES.ADMIN), user.index);
router.put("/updateBio", authorize([ROLES.ADMIN, ROLES.BUYER]), user.createBio);
router.get("/", authorize(), user.getUserData);

module.exports = router;

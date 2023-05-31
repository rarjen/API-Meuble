const router = require("express").Router();
const auth = require("../controllers/auth");
const authorize = require("../middlewares/authorize");

router.post("/register", auth.registerAccount);
router.post("/login", auth.loginAccount);
router.post("/whoami", authorize(), auth.whoami);

module.exports = router;

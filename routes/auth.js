const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/register", auth.registerAccount);
router.post("/login", auth.loginAccount);

module.exports = router;

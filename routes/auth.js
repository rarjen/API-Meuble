const router = require("express").Router();
const auth = require("../controllers/auth");
const authorize = require("../middlewares/authorize");

router.post("/register", auth.registerAccount);
router.post("/login", auth.loginAccount);
router.get("/whoami", authorize(), auth.whoami);

//Whoami to check who is login right now

module.exports = router;

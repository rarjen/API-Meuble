const router = require("express").Router();
const dashboard = require("../controllers/dashboard");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/data", authorize(ROLES.ADMIN), dashboard.index);

module.exports = router;

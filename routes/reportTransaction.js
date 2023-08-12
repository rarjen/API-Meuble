const router = require("express").Router();
const reportTransaction = require("../controllers/reportTransaction");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/", reportTransaction.create);

module.exports = router;

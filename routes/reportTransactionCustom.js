const router = require("express").Router();
const reportTransaction = require("../controllers/reportTransactionCustom");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/", authorize(ROLES.ADMIN), reportTransaction.create);

module.exports = router;

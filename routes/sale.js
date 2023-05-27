const router = require("express").Router();
const sale = require("../controllers/sale");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/", authorize(ROLES.ADMIN), sale.total);
router.get("/all-sales", authorize(ROLES.ADMIN), sale.index);

module.exports = router;

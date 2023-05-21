const router = require("express").Router();
const province = require("../controllers/province");

router.get("/", province.index);
router.get("/:province_id", province.show);

module.exports = router;

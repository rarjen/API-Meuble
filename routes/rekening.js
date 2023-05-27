const router = require("express").Router();
const rekening = require("../controllers/rekening");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.ADMIN), rekening.create);
router.put("/:rekening_id", authorize(ROLES.ADMIN), rekening.update);

module.exports = router;

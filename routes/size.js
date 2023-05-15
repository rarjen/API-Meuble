const router = require("express").Router();
const size = require("../controllers/size");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.ADMIN), size.create);
router.put("/:size_id", authorize(ROLES.ADMIN), size.destroy);
router.put("/edit/:size_id", authorize(ROLES.ADMIN), size.update);
router.get("/all-sizes", size.index);
router.get("/:size_id", size.show);

module.exports = router;

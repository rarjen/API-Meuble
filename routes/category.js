const router = require("express").Router();
const category = require("../controllers/category");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.ADMIN), category.create);
router.put("/edit/:category_id", authorize(ROLES.ADMIN), category.update);
router.put("/delete/:category_id", authorize(ROLES.ADMIN), category.destroy);
router.get("/", category.index);
router.get("/:category_id", category.show);

module.exports = router;

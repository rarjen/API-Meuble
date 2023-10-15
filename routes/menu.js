const router = require("express").Router();
const menu = require("../controllers/menu");

router.post("/", menu.createMenu);
router.get("/", menu.getAllMenu);
router.get("/:id", menu.getOne);
router.patch("/:id", menu.updateMenu);

module.exports = router;

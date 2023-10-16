const router = require("express").Router();
const categoryMenu = require("../controllers/categoryMenu");

router.post("/", categoryMenu.createMenu);
router.get("/", categoryMenu.getAllMenu);
router.get("/:id", categoryMenu.getOneMenu);
router.patch("/:id", categoryMenu.updateMenu);

module.exports = router;

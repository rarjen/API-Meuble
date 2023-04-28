const router = require("express").Router();
const product = require("../controllers/product");
const authorize = require("../middlewares/authorize");

router.post("/create", authorize("ADMIN"), product.create);
router.get("/", product.index);
router.get("/:product_id", product.show);
router.put("/edit/:product_id", authorize("ADMIN"), product.updateProducts);
router.put("/:product_id", authorize("ADMIN"), product.updateStatus);
router.delete("/:product_id", authorize("ADMIN"), product.destroy);

module.exports = router;

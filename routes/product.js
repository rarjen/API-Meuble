const router = require("express").Router();
const product = require("../controllers/admin/product");

router.post("/create", product.create);
router.get("/", product.index);
router.get("/:product_id", product.show);
router.put("/edit/:product_id", product.updateProducts);
router.put("/:product_id", product.updateStatus);
router.delete("/:product_id", product.destroy);

module.exports = router;

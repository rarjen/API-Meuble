const router = require("express").Router();
const product = require("../controllers/product");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/show/:product_id", product.show);
router.get("/bestseller", product.getBestSeller);
router.get("/", product.getByUser);
router.get("/show/category/:id_category", product.getProductByCategory);
router.get("/index", authorize(ROLES.ADMIN), product.getByAdmin);
router.post("/create", authorize(ROLES.ADMIN), product.create);
router.put("/edit/:product_id", authorize(ROLES.ADMIN), product.updateProducts);
router.put("/:product_id", authorize(ROLES.ADMIN), product.updateStatus);
router.delete("/:product_id", authorize(ROLES.ADMIN), product.destroy);

module.exports = router;

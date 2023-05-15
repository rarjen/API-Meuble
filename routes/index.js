const router = require("express").Router();
const product = require("./product");
const role = require("./role");
const auth = require("./auth");
const user = require("./user");
const payment = require("./payment");
const category = require("./category");
const order = require("./order");
const sale = require("./sale");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: null,
  });
});

router.use("/auth", auth);
router.use("/product", product);
router.use("/role", role);
router.use("/user", user);
router.use("/payment", payment);
router.use("/category", category);
router.use("/order", order);
router.use("/sale", sale);

module.exports = router;

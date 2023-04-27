const router = require("express").Router();
const product = require("./product");
const role = require("./role");
const auth = require("./auth");

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

module.exports = router;

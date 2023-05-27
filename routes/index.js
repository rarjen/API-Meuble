const router = require("express").Router();
const product = require("./product");
const role = require("./role");
const auth = require("./auth");
const user = require("./user");
const payment = require("./payment");
const category = require("./category");
const sale = require("./sale");
const size = require("./size");
const material = require("./material");
const customOrder = require("./customOrder");
const province = require("./province");
const courrier = require("./courrier");
const address = require("./address");
const transaction = require("./transaction");
const ongkir = require("./ongkir");
const uploadTransactionPicture = require("./uploadTransactionPicture");
const reportTransaction = require("./reportTransaction");

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
router.use("/sale", sale);
router.use("/size", size);
router.use("/material", material);
router.use("/custom-order", customOrder);
router.use("/province", province);
router.use("/courrier", courrier);
router.use("/address", address);
router.use("/transaction", transaction);
router.use("/ongkir", ongkir);
router.use("/uploadTransactionPicture", uploadTransactionPicture);
router.use("/reportTransaction", reportTransaction);

module.exports = router;

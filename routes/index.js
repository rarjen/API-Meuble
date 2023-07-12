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
const uploadTransactionCustomPicture = require("./uploadTransactionCustomPicture");
const reportTransaction = require("./reportTransaction");
const reportTransactionCustom = require("./reportTransactionCustom");
const coordinate = require("./coordinate");
const uploadProductPicture = require("./uploadProductPicture");
const customTransaction = require("./customTransaction");
const productRating = require("./productRating");
const dashboard = require("./dashboard");
const saleOrder = require("./saleOrder");
const landingPage = require('./landing_page');

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
router.use("/uploadTransactionCustomPicture", uploadTransactionCustomPicture);
router.use("/reportTransaction", reportTransaction);
router.use("/reportTransactionCustom", reportTransactionCustom);
router.use("/coordinate", coordinate);
router.use("/uploadProductPicture", uploadProductPicture);
router.use("/customTransaction", customTransaction);
router.use("/productRating", productRating);
router.use("/dashboard", dashboard);
router.use("/saleCustomOrder", saleOrder);
router.use('/landing_page', landingPage)

module.exports = router;

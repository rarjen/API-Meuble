const {
  Product,
  Transaction,
  Courrier,
  Payment,
  User,
  Image_transaction,
  Thumbnail_product_img,
  Address,
  City,
  Province,
  Role,
  Category,
} = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");
const { TRANSACTION, STATUS_TRANSACTION } = require("../utils/enum");
const { Op } = require("sequelize");

const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}${randomDigits}`;
};

const createTransaction = async (req) => {
  const user = req.user;
  const {
    product_id,
    qty,
    note,
    courrier_id,
    service,
    payment_id,
    total_weight,
    total,
    ongkir,
    grandTotal,
  } = req.body;

  const checkProduct = await Product.findOne({
    where: { id: product_id },
  });

  if (!checkProduct) {
    throw new NotFoundError(`Tidak ada product dengan id: ${product_id}`);
  }

  const checkPayment = await Payment.findOne({
    where: { id: payment_id },
  });
  if (!checkPayment) {
    throw new NotFoundError(`Tidak ada courrier dengan id: ${payment_id}`);
  }

  const checkCourrier = await Courrier.findOne({
    where: { id: courrier_id },
  });

  if (!checkCourrier) {
    throw new NotFoundError(`Tidak ada courrier dengan id: ${courrier_id}`);
  }

  const checkUser = await User.findOne({ where: { id: user.id } });
  const checkAddress = await Address.findOne({ where: { user_id: user.id } });

  if (!checkUser.mobile && !checkAddress) {
    throw new BadRequestError("Harap isi alamat/mobile");
  }

  if (
    checkPayment.payment.toLowerCase() === "cod" &&
    checkCourrier.courrier.toLowerCase() !== "internal delivery"
  ) {
    throw new BadRequestError(
      "Pembayaran COD hanya tersedia untuk Internal Delivery"
    );
  }

  const result = await Transaction.create({
    user_id: user.id,
    invoice_number: generateInvoiceNumber(),
    product_id,
    qty,
    note,
    courrier_id,
    service,
    payment_id,
    total_weight,
    total,
    ongkir,
    grandTotal,
    status: TRANSACTION.PENDING,
  });

  return result;
};

const readTransaction = async (req) => {
  const { status, searchInvoice, page = 1, limit = 10 } = req.query;

  let where = {};

  if (status) {
    where.status = status;
  }

  if (searchInvoice) {
    where = {
      invoice_number: { [Op.like]: "%" + searchInvoice + "%" },
    };
  }

  if (searchInvoice && status) {
    where = {
      status: status,
      invoice_number: { [Op.like]: "%" + searchInvoice + "%" },
    };
  }

  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allProducts = await Product.count();
  const totalPage = Math.ceil(allProducts / limit);

  const result = await Transaction.findAll({
    offset: offset,
    limit: limitPage,
    where,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["first_name", "last_name", "email"],
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["role"],
          },
          {
            model: Address,
            as: "address",
            attributes: ["address"],
            include: [
              {
                model: City,
                as: "city",
                attributes: ["city_name"],
              },
              {
                model: Province,
                as: "province",
                attributes: ["province"],
              },
            ],
          },
        ],
      },
      {
        model: Product,
        as: "product",
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["category"],
          },
          {
            model: Thumbnail_product_img,
            as: "thumbnail",
            attributes: ["img_url"],
          },
        ],
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Image_transaction,
        as: "img_transaction",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allProducts,
    totalPage: totalPage,
  };
};

const readTransactionUser = async (req) => {
  const { status } = req.query;
  const user = req.user;

  let where = {};

  if (status) {
    where = {
      status: status,
      user_id: user.id,
    };
  }

  const result = await Transaction.findAll({
    where,
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Product,
        as: "product",
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Image_transaction,
        as: "img_transaction",
      },
    ],
  });

  return result;
};

const cancelTransaction = async (req) => {
  const { transaction_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(`Tidak ada Transaksi dengan id: ${transaction_id}`);
  }

  if (checkTransaction.status !== TRANSACTION.PENDING) {
    throw new BadRequestError(`Tidak dapat melakukan cancel!`);
  }

  const result = await Transaction.update(
    { status: TRANSACTION.CANCELLED },
    { where: { id: transaction_id } }
  );

  return result;
};

const inputResi = async (req) => {
  const { transaction_id } = req.params;
  const { nomerResi } = req.body;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(`Tidak ada Transaksi dengan id: ${transaction_id}`);
  }

  if (checkTransaction.status !== TRANSACTION.PAID) {
    throw new BadRequestError(`Nomer resi tidak dapat diinput!`);
  }

  const result = await Transaction.update(
    {
      nomerResi,
      statusTransaction: STATUS_TRANSACTION.ON_PROCESS,
    },
    { where: { id: transaction_id } }
  );

  return result;
};

const updateTransactionStatus = async (req) => {
  const { transaction_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(`Tidak ada transaksi dengan id: ${transaction_id}`);
  }

  if (checkTransaction.status !== TRANSACTION.PENDING) {
    throw new BadRequestError(`Tidak dapat melakukan update!`);
  }

  const checkProduct = await Product.findOne({
    where: { id: checkTransaction.product_id },
  });

  const result = await Transaction.update(
    { status: TRANSACTION.PAID },
    { where: { id: transaction_id } }
  );

  let total = checkProduct.stock - checkTransaction.qty;

  await Product.update(
    { stock: total },
    { where: { id: checkTransaction.product_id } }
  );

  return result;
};

const updateDone = async (req) => {
  const { transaction_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_id },
    include: { model: Product, as: "product" },
  });

  if (!checkTransaction) {
    throw new NotFoundError(`Tidak ada transaksi dengan id: ${transaction_id}`);
  }

  if (
    (checkTransaction.status !== TRANSACTION.PAID &&
      !checkTransaction.nomerResi) ||
    checkTransaction.statusTransaction === STATUS_TRANSACTION.DONE
  ) {
    throw new BadRequestError(`Tidak dapat melakukan update!`);
  }

  let total = checkTransaction.product.total_sold + checkTransaction.qty;

  const result = await Transaction.update(
    {
      statusTransaction: STATUS_TRANSACTION.DONE,
    },
    { where: { id: transaction_id } }
  );
  await Product.update(
    {
      total_sold: total,
    },
    { where: { id: checkTransaction.product_id } }
  );

  return result;
};

module.exports = {
  createTransaction,
  readTransaction,
  inputResi,
  readTransactionUser,
  cancelTransaction,
  updateTransactionStatus,
  updateDone,
};

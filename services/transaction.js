const {
  Product,
  Transaction,
  Courrier,
  Payment,
  User,
  Image_transaction,
} = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");
const uploadImgPayment = require("../utils/media/uploadImgPayment");
const { TRANSACTION } = require("../utils/enum");
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

  if (
    checkPayment.payment.toLowerCase() === "cod" &&
    checkCourrier.courrier.toLowerCase() !== "internal delivery"
  ) {
    throw new BadRequestError(
      `Pembayaran COD hanya tersedia untuk Internal Delivery`
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

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allProducts,
    totalPage: totalPage,
  };
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

  const result = await Transaction.update({
    nomerResi,
    status: TRANSACTION.PAID,
  });

  return result;
};

module.exports = { createTransaction, readTransaction, inputResi };
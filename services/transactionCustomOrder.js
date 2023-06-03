const { NotFoundError, BadRequestError } = require("../errors");
const {
  Transaction_custom_order,
  Payment,
  Courrier,
  User,
  Size,
  Material,
  Category,
  Image_transaction_custom_order,
} = require("../models");
const { TRANSACTION, CUSTOM_ORDER } = require("../utils/enum");

const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}${randomDigits}`;
};

const createTransaction = async (req) => {
  const { category_id, payment_id, size_id, material_id, qty, note } = req.body;
  const user = req.user;

  const checkPayment = await Payment.findOne({ where: { id: payment_id } });
  if (!checkPayment) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  const result = await Transaction_custom_order.create({
    user_id: user.id,
    category_id,
    payment_id,
    size_id,
    material_id,
    invoice_number: generateInvoiceNumber(),
    qty,
    note,
    statusOrder: CUSTOM_ORDER.WAITING,
    statusPayment: TRANSACTION.PENDING,
  });

  return result;
};

const cancelOrderUser = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }
  if (
    checkTransaction.statusPayment !== TRANSACTION.PENDING ||
    checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING
  ) {
    throw new BadRequestError("Tidak dapat membatalkan pesanan");
  }

  const result = await Transaction_custom_order.update(
    {
      statusOrder: CUSTOM_ORDER.CANCELLED,
      statusPayment: TRANSACTION.CANCELLED,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const cancelOrderAdmin = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }
  if (
    checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING ||
    checkTransaction.statusPayment !== TRANSACTION.PENDING
  ) {
    throw new BadRequestError("Tidak dapat membatalkan pesanan");
  }

  const result = await Transaction_custom_order.update(
    {
      statusOrder: CUSTOM_ORDER.REJECTED,
      statusPayment: TRANSACTION.CANCELLED,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const acceptCustomOrderAdmin = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada transaction custom dengan id: ${transaction_custom_order_id}`
    );
  }
  if (checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING) {
    throw new BadRequestError("Tidak dapat menerima pesanan");
  }

  const result = await Transaction_custom_order.update(
    {
      statusOrder: CUSTOM_ORDER.ON_PROCESS,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const updateCustomTransactionAdmin = async (req) => {
  const { transaction_custom_order_id } = req.params;
  const { courrier_id, total_weight, total, ongkir, grandTotal } = req.body;

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  const checkCourrier = await Courrier.findOne({ where: { id: courrier_id } });
  if (!checkCourrier) {
    throw new NotFoundError(`Tidak ada courrier dengan id: ${courrier_id}`);
  }

  const checkPayment = await Payment.findOne({
    where: { id: checkTransaction.payment_id },
  });

  if (checkPayment.payment !== "COD" && checkCourrier !== "Internal Delivery") {
    throw new BadRequestError(
      `Pembayaran COD hanya tersedia untuk Internal Delivery`
    );
  }

  const result = await Transaction_custom_order.update(
    {
      courrier_id,
      total_weight,
      total,
      ongkir,
      grandTotal,
      statusPayment: TRANSACTION.PENDING,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const updateStatusPayment = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  if (
    checkTransaction.statusOrder !== CUSTOM_ORDER.ON_PROCESS ||
    checkTransaction.statusPayment !== TRANSACTION.PENDING
  ) {
    throw new BadRequestError(`Tidak dapat update status pembayaran!`);
  }

  const checkPicture = await Image_transaction_custom_order.findOne({
    where: { transaction_custom_order_id },
  });

  if (!checkPicture) {
    throw new BadRequestError(`Tidak dapat update status pembayaran gambar!`);
  }

  const result = await Transaction_custom_order.update(
    { statusPayment: TRANSACTION.PAID },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const inputResi = async (req) => {
  const { transaction_custom_order_id } = req.params;
  const { nomerResi } = req.body;

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  if (checkTransaction.statusPayment !== TRANSACTION.PAID) {
    throw new BadRequestError(`Tidak dapat melakukan input resi`);
  }

  const checkCourrier = await Courrier.findOne({
    where: { id: checkTransaction.courrier_id },
  });

  if (checkCourrier.courrier === "Internal Delivery") {
    throw new BadRequestError(`Tidak dapat melakukan input resi`);
  }

  const result = await Transaction_custom_order.update(
    { nomerResi },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const updateDone = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  if (
    checkTransaction.statusOrder !== CUSTOM_ORDER.ON_PROCESS ||
    checkTransaction.statusPayment !== TRANSACTION.PAID
  ) {
    throw new BadRequestError("Tidak dapat melakukan update!");
  }

  const result = await Transaction_custom_order.update(
    { statusOrder: CUSTOM_ORDER.DONE },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const readTransactionAdmin = async (req) => {
  const { searchInvoice, page = 1, limit = 10 } = req.query;

  let where = {};

  if (searchInvoice) {
    where = {
      invoice_number: { [Op.like]: "%" + searchInvoice + "%" },
    };
  }

  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allTransaction = await Transaction_custom_order.count();
  const totalPage = Math.ceil(allTransaction / limit);

  const result = await Transaction_custom_order.findAll({
    offset: offset,
    limit: limitPage,
    where,
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Category,
        as: "category",
      },
      {
        model: Size,
        as: "size",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Image_transaction_custom_order,
        as: "img_transaction",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allTransaction,
    totalPage: totalPage,
  };
};

const readTransactionUser = async (req) => {
  const user = req.user;

  const result = await Transaction_custom_order.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Category,
        as: "category",
      },
      {
        model: Size,
        as: "size",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Image_transaction_custom_order,
        as: "img_transaction",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return result;
};

const readOneTransaction = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const result = await Transaction_custom_order.findAll({
    where: { id: transaction_custom_order_id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Category,
        as: "category",
      },
      {
        model: Size,
        as: "size",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Image_transaction_custom_order,
        as: "img_transaction",
      },
    ],
  });

  return result;
};

module.exports = {
  createTransaction,
  acceptCustomOrderAdmin,
  updateCustomTransactionAdmin,
  updateStatusPayment,
  inputResi,
  cancelOrderUser,
  cancelOrderAdmin,
  updateDone,
  readTransactionAdmin,
  readTransactionUser,
  readOneTransaction,
};

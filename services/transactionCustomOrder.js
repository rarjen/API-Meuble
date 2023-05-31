const { NotFoundError, BadRequestError } = require("../errors");
const { Transaction_custom_order } = require("../models");
const { TRANSACTION, CUSTOM_ORDER } = require("../utils/enum");

const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}${randomDigits}`;
};

const create = async (req) => {
  const { category_id, payment_id, size_id, material_id, qty, note } = req.body;
  const user = req.user;

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
  if (checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING) {
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

const inputAdmin = async (req) => {
  const { transaction_custom_order_id } = req.params;
  // const {}

  const checkTransaction = await Transaction_custom_order.findOne({
    where: { id: transaction_custom_order_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }
};

module.exports = { create, cancelOrderUser, cancelOrderAdmin };

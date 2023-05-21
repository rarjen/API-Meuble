const {
  Order,
  Product,
  Order_detail,
  Transaction,
  User,
  Payment,
} = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");
const { Op } = require("sequelize");
const { TRANSACTION } = require("../utils/enum");

const createOrder = async (req) => {
  const user = req.user;
  const { product_id, qty, note } = req.body;

  const checkUser = await User.findOne({ where: { id: user.id } });

  if (checkUser.mobile == null && checkUser.address == null) {
    throw new BadRequestError(
      `Mobile / Address kosong, harap isi terlebih dahulu`
    );
  }

  const checkProduct = await Product.findOne({ where: { id: product_id } });

  if (!checkProduct) {
    throw new NotFoundError(`Tidak ada product dengan id: ${product_id}`);
  }

  const result = await Order.create({
    user_id: user.id,
    product_id: product_id,
    qty,
    note,
  });

  await Order_detail.create({
    order_id: result.id,
    total: checkProduct.harga * qty,
  });

  await Transaction.create({
    user_id: user.id,
    order_id: result.id,
    payment_id: null,
    status: TRANSACTION.PENDING,
  });

  return result;
};

const deleteOrder = async (req) => {
  const { order_id } = req.params;

  const checkOrder = await Order.findOne({ where: { id: order_id } });
  const checkOrderDetail = await Order_detail.findOne({ where: { order_id } });

  if (!checkOrder && !checkOrderDetail) {
    throw new NotFoundError(`Tidak ada order dengan id: ${order_id}`);
  }

  const result = await Order.destroy({ where: { id: order_id } });
  await Order_detail.destroy({ where: { order_id } });

  return result;
};

const cancelOrder = async (req) => {
  const { order_id } = req.params;

  const checkOrder = await Order.findOne({ where: { id: order_id } });
  const checkOrderDetail = await Order_detail.findOne({ where: { order_id } });

  const checkTransaction = await Transaction.findOne({ where: { order_id } });

  if (
    checkTransaction.status === TRANSACTION.PAID ||
    checkTransaction.payment_id !== null
  ) {
    throw new BadRequestError(
      "Tidak dapat melakukan cancel order yang sudah dibayarkan"
    );
  }

  if (!checkOrder && !checkOrderDetail) {
    throw new NotFoundError(`Tidak ada order dengan id: ${order_id}`);
  }

  const result = await Transaction.update(
    { status: TRANSACTION.CANCELLED },
    { where: { order_id } }
  );

  return result;
};

const readOrderByAdmin = async (req) => {
  const { start_date, end_date } = req.query;

  if (start_date && end_date) {
    const result = await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [
            new Date(start_date).setHours(0, 0, 0),
            new Date(end_date).setHours(23, 59, 59),
          ],
        },
      },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Order_detail,
          as: "order_detail",
        },
        {
          model: Transaction,
          as: "transaction",
        },
        {
          model: Payment,
          as: "payment",
        },
      ],
    });

    return result;
  }

  const result = await Order.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Order_detail,
        as: "order_detail",
      },
      {
        model: Transaction,
        as: "transaction",
      },
      {
        model: Payment,
        as: "payment",
      },
    ],
  });

  return result;
};

const readOrderByUser = async (req) => {
  const user = req.user;

  const result = await Order.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Order_detail,
        as: "order_detail",
      },
      {
        model: Transaction,
        as: "transaction",
      },
      {
        model: Payment,
        as: "payment",
      },
    ],
  });

  return result;
};

module.exports = {
  createOrder,
  readOrderByAdmin,
  readOrderByUser,
  deleteOrder,
  cancelOrder,
};

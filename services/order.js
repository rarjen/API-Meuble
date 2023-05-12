const { Order, Product, Order_detail, Transaction } = require("../models");
const { NotFoundError } = require("../errors");
const { Op } = require("sequelize");

const createOrder = async (req) => {
  const user = req.user;
  const { product_id } = req.query;
  const { qty, note } = req.body;

  const checkProduct = await Product({ where: { id: product_id } });

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
    });

    return result;
  }

  const result = await Order.findAll({});

  return result;
};

const readOrderByUser = async (req) => {
  const user = req.user;

  const result = await Order.findAll({ where: { user_id: user.id } });

  return result;
};

module.exports = {
  createOrder,
  readOrderByAdmin,
  readOrderByUser,
  deleteOrder,
};

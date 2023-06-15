const { Product, Transaction } = require("../models");
const { STATUS_TRANSACTION, TRANSACTION } = require("../utils/enum");
const { Sequelize } = require("sequelize");

const getData = async (req) => {
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const getProductTotal = await Product.count();

  const getProductSaled = await Transaction.count({
    where: {
      statusTransaction: STATUS_TRANSACTION.DONE,
    },
    distinct: true,
    col: "product_id",
  });

  const topThreeSoldProducts = await Transaction.findAll({
    attributes: [
      "product_id",
      [Sequelize.fn("COUNT", Sequelize.col("product_id")), "qty"],
    ],
    where: {
      statusTransaction: STATUS_TRANSACTION.DONE,
    },
    group: ["product_id"],
    order: [[Sequelize.literal("qty"), "DESC"]],
    include: [{ model: Product, as: "product" }],
    limit: 3,
  });

  const totalOrder = await Transaction.count();
  const onProcess = await Transaction.count({
    where: { statusTransaction: STATUS_TRANSACTION.ON_PROCESS },
  });

  const successOrderThisMonth = await Transaction.count({
    where: {
      statusTransaction: STATUS_TRANSACTION.DONE,
      createdAt: {
        [Sequelize.Op.between]: [startOfMonth, endOfMonth], // Menambahkan kondisi tanggal
      },
    },
  });

  const failOrderThisMonth = await Transaction.count({
    where: {
      status: TRANSACTION.CANCELLED,
      createdAt: {
        [Sequelize.Op.between]: [startOfMonth, endOfMonth], // Menambahkan kondisi tanggal
      },
    },
  });

  const totalSales = await Transaction.sum("grandTotal", {
    where: {
      statusTransaction: STATUS_TRANSACTION.DONE,
      createdAt: {
        [Sequelize.Op.between]: [startOfMonth, endOfMonth], // Menambahkan kondisi tanggal
      },
    },
  });

  return {
    product_total: getProductTotal,
    product_saled: getProductSaled,
    ranking_product: topThreeSoldProducts,
    total_order: totalOrder,
    order_on_process: onProcess,
    success_order_this_month: successOrderThisMonth,
    failed_order_this_month: failOrderThisMonth,
    totalSales: totalSales,
  };
};

module.exports = { getData };

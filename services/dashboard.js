const { Product, Transaction, Transaction_custom_order } = require("../models");
const { STATUS_TRANSACTION, TRANSACTION, CUSTOM_ORDER } = require("../utils/enum");
const { Sequelize } = require("sequelize");
const moment = require("moment");

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


  allTransactions = await grafik(Transaction, { statusTransaction: STATUS_TRANSACTION.DONE });
  allCustomTransactions = await grafik(Transaction_custom_order, { statusOrder: CUSTOM_ORDER.WAITING });

  return {
    product_total: getProductTotal,
    product_saled: getProductSaled,
    ranking_product: topThreeSoldProducts,
    total_order: totalOrder,
    order_on_process: onProcess,
    success_order_this_month: successOrderThisMonth,
    failed_order_this_month: failOrderThisMonth,
    totalSales: totalSales,
    transaction_chart: allTransactions,
    custom_transaction_chart: allCustomTransactions,
  };
};

async function grafik(type, where = {}) {
  let allTransactions = await type.findAll({
    where: {
      ...where,
      createdAt: {
        [Sequelize.Op.between]: [
          moment().startOf('year').format('YYYY-MM-DD'),
          moment().endOf('year').format('YYYY-MM-DD')
        ]
      },
    },
    // group berdasarkan createdAt bulan
    group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
    attributes: [
      [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'bulan'],
      [Sequelize.fn('sum', Sequelize.col('grandTotal')), 'total'],
      [Sequelize.fn('count', Sequelize.col('id')), 'total_transaksi'],
    ],
  });

  resultAllTransactions = [];
  if (allTransactions.length < 1) {
    for (let i = 0; i < 12; i++) {
      resultAllTransactions.push({
        bulan: i + 1,
        total: 0,
        total_transaksi: 0,
      });
    }
  } else {
    let month = 0;
    const temp = allTransactions.map((item) => item.dataValues);
    for (let i = 0; i < 12; i++) {
      if (temp.length > month && temp[month].bulan == i + 1) {
        resultAllTransactions.push(temp[month]);
        month++;
      } else {
        resultAllTransactions.push({
          bulan: i + 1,
          total: 0,
          total_transaksi: 0,
        });
      }
    }
  }
  return resultAllTransactions;
}

module.exports = { getData };

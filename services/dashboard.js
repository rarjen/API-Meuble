const { Product, Transaction } = require("../models");
const { STATUS_TRANSACTION } = require("../utils/enum");
const { Sequelize } = require("sequelize");

const getData = async (req) => {
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

  //   let succes_sale_array = [];

  //   const success_sale = await Transaction.findAll({
  //     attributes: [
  //       [
  //         Sequelize.fn("date_trunc", "month", Sequelize.col("createdAt")),
  //         "month",
  //       ],
  //       [Sequelize.fn("count", Sequelize.col("id")), "count"],
  //     ],
  //     where: { statusTransaction: STATUS_TRANSACTION.DONE }, // Ganti dengan status yang sesuai
  //     group: [Sequelize.fn("date_trunc", "month", Sequelize.col("createdAt"))],
  //     raw: true,
  //   });

  //   success_sale.forEach((row) => {
  //     const month = new Date(row.month).toLocaleString({
  //       month: "long",
  //       year: "numeric",
  //     });
  //     console.log(`${month}: ${row.count}`);
  //     succes_sale_array.push({ month: month, total: row.count });
  //     console.log(row);
  //   });

  return {
    product_total: getProductTotal,
    product_saled: getProductSaled,
    ranking_product: topThreeSoldProducts,
    total_order: totalOrder,
    order_on_process: onProcess,
    // success_sale: succes_sale_array,
    // fail_sale: "",
  };
};

module.exports = { getData };

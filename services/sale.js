const { Order_detail, Order, Transaction } = require("../models");
const { Op } = require("sequelize");
const { TRANSACTION } = require("../utils/enum");

const getTotal = async () => {
  const result = await Transaction.findAll({
    where: { status: TRANSACTION.PAID },
    include: [
      {
        model: Order,
        as: "order",
        include: [
          {
            model: Order_detail,
            as: "order_detail",
          },
        ],
      },
    ],
  });

  let string = JSON.stringify(result);
  let data = JSON.parse(string);

  let total = 0;

  data.forEach((element) => {
    total += element.order.order_detail.total;
  });

  return total;
};

const getSale = async (req) => {
  const { start_date, end_date } = req.query;

  if (start_date && end_date) {
    const result = await Transaction.findAll({
      where: {
        status: TRANSACTION.PAID,
        createdAt: {
          [Op.between]: [
            new Date(start_date).setHours(0, 0, 0),
            new Date(end_date).setHours(23, 59, 59),
          ],
        },
      },
      include: [
        {
          model: Order,
          as: "order",
          include: [
            {
              model: Order_detail,
              as: "order_detail",
            },
          ],
        },
      ],
    });

    return result;
  }

  const result = await Transaction.findAll({
    where: { status: TRANSACTION.PAID },
    include: [
      {
        model: Order,
        as: "order",
        include: [
          {
            model: Order_detail,
            as: "order_detail",
          },
        ],
      },
    ],
  });

  return result;
};

module.exports = { getTotal, getSale };

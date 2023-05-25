const { Transaction, Transaction_custom_order } = require("../models");
const { TRANSACTION } = require("../utils/enum");

const getTotalCustom = async () => {
  const result = await Transaction_custom_order.findAll({
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

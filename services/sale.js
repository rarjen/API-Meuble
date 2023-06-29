const {
  Transaction,
  User,
  Courrier,
  Payment,
  Product,
  Category,
} = require("../models");

const { STATUS_TRANSACTION } = require("../utils/enum");

const getTotal = async () => {
  const result = await Transaction.findAll({
    where: { statusTransaction: STATUS_TRANSACTION.DONE },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["email", "first_name", "last_name"],
      },
      {
        model: Product,
        as: "product",
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["category"],
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Courrier,
        as: "courrier",
        attributes: ["courrier"],
      },
      {
        model: Payment,
        as: "payment",
        attributes: ["payment", "rekening"],
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  return result;
};

module.exports = { getTotal };

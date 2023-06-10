const { NotFoundError, BadRequestError } = require("../errors");
const { Product_rating, Transaction } = require("../models");
const { STATUS_TRANSACTION } = require("../utils/enum");

const updateOrCreateRating = async (req) => {
  const user = req.user;
  const { transaction_id, rating } = req.body;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError("Transaksi tidak ada!");
  }

  if (checkTransaction.statusTransaction !== STATUS_TRANSACTION.DONE) {
    throw new BadRequestError("Transaksi belum selesai!");
  }

  const checkRating = await Product_rating.findOne({
    where: { user_id: user.id, product_id: checkTransaction.product_id },
  });

  if (checkRating) {
    const result = await Product_rating.update(
      {
        rating,
      },
      { where: { id: checkRating.id } }
    );

    return result;
  }

  const result = await Product_rating.create({
    user_id: user.id,
    product_id: checkTransaction.product_id,
    transaction_id,
    rating,
  });

  return result;
};

module.exports = { updateOrCreateRating };

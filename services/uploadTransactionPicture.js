const { Image_transaction, Transaction } = require("../models");
const { NotFoundError } = require("../errors");
const uploadImgPayment = require("../utils/media/uploadImgPayment");

const uploadImage = async (req) => {
  const { transaction_id } = req.body;
  const file = req.file.buffer.toString("base64");

  const integerTransactionId = parseInt(transaction_id);

  const checkTransaction = await Transaction.findOne({
    where: { id: integerTransactionId },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada transaksi dengan id: ${integerTransactionId}`
    );
  }

  const dataUpload = await uploadImgPayment(file);

  const result = await Image_transaction.create({
    transaction_id: integerTransactionId,
    img_url: dataUpload.url,
  });

  return result;
};

module.exports = { uploadImage };

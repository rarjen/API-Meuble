const { Transaction, Image_transaction, Payment } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");
const uploadImgPayment = require("../utils/media/uploadImgPayment");

const uploadImageTransaction = async (req) => {
  const { transaction_custom_order_id } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  const checkPayment = await Payment.findOne({
    where: { id: checkTransaction.payment_id },
  });
  if (checkPayment.payment === "COD") {
    throw new BadRequestError(
      `Upload bukti transaksi hanya untuk transfer bank!`
    );
  }

  const checkPicture = await Image_transaction.findOne({
    where: { transaction_id: transaction_custom_order_id },
  });

  if (checkPicture) {
    const dataUpload = await uploadImgPayment(file);

    const result = await Image_transaction.update(
      {
        transaction_id: transaction_custom_order_id,
        img_url: dataUpload.url,
      },
      { where: { transaction_custom_order_id } }
    );

    return result;
  }

  const dataUpload = await uploadImgPayment(file);

  const result = await Image_transaction.create({
    transaction_id: transaction_custom_order_id,
    img_url: dataUpload.url,
  });

  return result;
};

module.exports = { uploadImageTransaction };

const { Transaction, Reference_img } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");
const { deleteSingleImg } = require("../utils/media/deleteImage");
const uploadImgPayment = require("../utils/media/uploadImgPayment");
const { ORDER_TYPE, CUSTOM_ORDER } = require("../utils/enum");

const uploadReferenceImg = async (req) => {
  const { transaction_id } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError("Tidak ada transaksi!");
  }

  if (
    checkTransaction.orderType !== ORDER_TYPE.CUSTOM ||
    checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING
  ) {
    throw new BadRequestError("Tidak dapat upload gambar!");
  }

  const checkPicture = await Reference_img.findOne({
    where: { transaction_id },
  });

  if (checkPicture) {
    await deleteSingleImg(checkPicture.imagekit_id);
    const dataUpload = await uploadImgPayment(file);

    const result = await Reference_img.update(
      {
        transaction_id: transaction_id,
        img_url: dataUpload.url,
        imagekit_id: dataUpload.uploadFile.fileId,
      },
      { where: { transaction_id } }
    );

    return result;
  }

  const dataUpload = await uploadImgPayment(file);

  const result = await Reference_img.create({
    transaction_id: transaction_id,
    img_url: dataUpload.url,
    imagekit_id: dataUpload.uploadFile.fileId,
  });

  return result;
};

module.exports = { uploadReferenceImg };

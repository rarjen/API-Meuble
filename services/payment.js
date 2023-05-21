const { Payment } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const uploadImgPayment = require("../utils/media/uploadImgPayment");
const { deleteSingleImg } = require("../utils/media/deleteImage");
const { Op } = require("sequelize");

const createPayment = async (req) => {
  const { payment } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkPayment = await Payment.findOne({ where: { payment } });
  if (checkPayment) {
    throw new BadRequestError("Payment sudah terdaftar!");
  }

  const dataUpload = await uploadImgPayment(file);

  const result = await Payment.create({
    payment,
    img_url: dataUpload.url,
    imagekit_id: dataUpload.uploadFile.fileId,
  });

  return result;
};

const getAllPayments = async () => {
  const result = await Payment.findOne({ where: { payment: "COD" } });

  return result;
};

const getOnePayment = async (req) => {
  const { payment_id } = req.params;

  const result = await Payment.findOne({ where: { id: payment_id } });

  if (!result) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  return result;
};

const editPayment = async (req) => {
  const { payment_id } = req.params;
  const { payment } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkPayment = await Payment.findOne({
    where: { payment },
    id: { [Op.ne]: payment_id },
  });

  if (checkPayment) {
    throw new BadRequestError("Payment sudah terdaftar!");
  }

  const getImageKitId = await Payment.findOne({
    where: { id: payment_id },
  });

  if (!getImageKitId) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  await deleteSingleImg(getImageKitId.imagekit_id);
  const dataUpload = await uploadImgPayment(file);

  const result = await Payment.update(
    {
      payment,
      img_url: dataUpload.url,
      imagekit_id: dataUpload.uploadFile.fileId,
    },
    { where: { id: payment_id } }
  );

  return result;
};

const deletePayment = async (req) => {
  const { payment_id } = req.params;

  const checkPayment = await Payment.findOne({ where: { id: payment_id } });
  if (!checkPayment) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  await deleteSingleImg(checkPayment.imagekit_id);
  const result = await Payment.destroy({ where: { id: payment_id } });

  return result;
};

module.exports = {
  createPayment,
  getAllPayments,
  getOnePayment,
  editPayment,
  deletePayment,
};

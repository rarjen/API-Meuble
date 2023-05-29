const { Payment, Rekening } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const uploadImgPayment = require("../utils/media/uploadImgPayment");
const { deleteSingleImg } = require("../utils/media/deleteImage");
const { Op } = require("sequelize");
const { PAYMENT, ROLES } = require("../utils/enum");

const createPayment = async (req) => {
  const { payment, rekening } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkPayment = await Payment.findOne({ where: { payment } });
  if (checkPayment) {
    throw new BadRequestError("Payment sudah terdaftar!");
  }

  const dataUpload = await uploadImgPayment(file);

  const result = await Payment.create({
    payment,
    rekening,
    img_url: dataUpload.url,
    imagekit_id: dataUpload.uploadFile.fileId,
    status: PAYMENT.ACTIVE,
  });

  return result;
};

const getAllPayments = async (req) => {
  const user = req.user;
  let where = {};

  if (user.role === ROLES.BUYER) {
    where = {
      status: PAYMENT.ACTIVE,
    };
  }

  const result = await Payment.findAll({
    where,
    include: [{ model: Rekening, as: "rekening" }],
  });

  return result;
};

const getOnePayment = async (req) => {
  const { payment_id } = req.params;

  const result = await Payment.findOne({
    where: { id: payment_id },
    include: [{ model: Rekening, as: "rekening" }],
  });

  if (!result) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  return result;
};

const editPayment = async (req) => {
  const { payment_id } = req.params;
  const { payment, rekening } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkPayment = await Payment.findOne({
    where: { payment },
    id: { [Op.ne]: payment_id },
  });

  const getImageKitId = await Payment.findOne({
    where: { id: payment_id },
  });

  if (!getImageKitId) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  if (checkPayment) {
    throw new BadRequestError("Payment sudah terdaftar!");
  }

  await deleteSingleImg(getImageKitId.imagekit_id);
  const dataUpload = await uploadImgPayment(file);

  const result = await Payment.update(
    {
      payment,
      rekening,
      img_url: dataUpload.url,
      imagekit_id: dataUpload.uploadFile.fileId,
    },
    { where: { id: payment_id } }
  );

  return result;
};

const editStatusPayment = async (req) => {
  const { payment_id } = req.params;

  const checkPayment = await Payment.findOne({ where: { id: payment_id } });
  if (!checkPayment) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  if (checkPayment.status === PAYMENT.ACTIVE) {
    const result = await Payment.update(
      { status: PAYMENT.INACTIVE },
      { where: { id: payment_id } }
    );

    return result;
  }

  const result = await Payment.update(
    { status: PAYMENT.ACTIVE },
    { where: { id: payment_id } }
  );

  return result;
};

module.exports = {
  createPayment,
  getAllPayments,
  getOnePayment,
  editPayment,
  editStatusPayment,
};

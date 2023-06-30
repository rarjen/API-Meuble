const { Payment } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const uploadImgPayment = require("../utils/media/uploadImgPayment");
const { deleteSingleImg } = require("../utils/media/deleteImage");
const { Op } = require("sequelize");
const { PAYMENT, ROLES } = require("../utils/enum");

const createPayment = async (req) => {
  const { payment, rekening } = req.body;

  const checkPayment = await Payment.findOne({ where: { payment } });
  if (checkPayment) {
    throw new BadRequestError("Payment sudah terdaftar!");
  }

  const result = await Payment.create({
    payment,
    rekening,
    status: PAYMENT.ACTIVE,
  });

  return result;
};

const uploadOrUpdateImg = async (req) => {
  const { payment_id } = req.params;
  const file = req.file.buffer.toString("base64");

  const checkPayment = await Payment.findOne({ where: { id: payment_id } });
  if (!checkPayment) {
    throw new NotFoundError("Payment tidak ada!");
  }

  if (checkPayment.img_url) {
    await deleteSingleImg(checkPayment.imagekit_id);
    const dataUpload = await uploadImgPayment(file);

    const result = await Payment.update(
      {
        img_url: dataUpload.url,
        imagekit_id: dataUpload.uploadFile.fileId,
      },
      { where: { id: payment_id } }
    );

    return result;
  }

  const dataUpload = await uploadImgPayment(file);

  const result = await Payment.update(
    {
      img_url: dataUpload.url,
      imagekit_id: dataUpload.uploadFile.fileId,
    },
    { where: { id: payment_id } }
  );

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
  });

  return result;
};

const getOnePayment = async (req) => {
  const { payment_id } = req.params;

  const result = await Payment.findOne({
    where: { id: payment_id },
  });

  if (!result) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  return result;
};

const editPayment = async (req) => {
  const { payment_id } = req.params;
  const { payment, rekening } = req.body;

  const checkPayment = await Payment.findOne({
    where: { id: payment_id },
  });

  if (!checkPayment) {
    throw new NotFoundError("Payment tidak ada!");
  }

  const checkDuplicate = await Payment.findOne({
    where: {
      payment,
      rekening,
      id: { [Op.ne]: payment_id },
    },
  });

  if (checkDuplicate) {
    throw new BadRequestError("Payment/rekening sudah terdaftar!");
  }

  const result = await Payment.update(
    {
      payment,
      rekening,
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
  uploadOrUpdateImg,
};

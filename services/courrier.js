const { Courrier } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const uploadImgPayment = require("../utils/media/uploadImgPayment");
const { COURRIER } = require("../utils/enum");
const querySort = require("../utils/querySort");

const createCourrier = async (req) => {
  const { courrier } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkCourrier = await Courrier.findOne({ where: { courrier } });
  if (checkCourrier) {
    throw new BadRequestError("Courrier sudah terdaftar!");
  }

  const dataUpload = await uploadImgPayment(file);
  const result = await Courrier.create({
    courrier,
    img_url: dataUpload.url,
    imagekit_id: dataUpload.uploadFile.fileId,
    status: COURRIER.ACTIVE,
  });

  return result;
};

const updateStatus = async (req) => {
  const { courrier_id } = req.params;

  const checkCourrier = await Courrier.findOne({ where: { id: courrier_id } });

  if (!checkCourrier) {
    throw new NotFoundError(`Tidak ada kurir dengan id: ${courrier_id}`);
  }

  if (checkCourrier.status === COURRIER.ACTIVE) {
    const result = await Courrier.update(
      { status: COURRIER.INACTIVE },
      { where: { id: courrier_id } }
    );

    return result;
  }

  const result = await Courrier.update(
    { status: COURRIER.ACTIVE },
    { where: { id: courrier_id } }
  );

  return result;
};

const readCourrierUser = async () => {
  const result = Courrier.findAll({ where: { status: COURRIER.ACTIVE } });

  return result;
};

const readCourrierAdmin = async (req) => {
  const { status, sort } = req.query;
  const dataSort = querySort(sort);

  let where = {};

  if (status) {
    where.status = status;
  }

  const result = Courrier.findAll({ where, order: dataSort });

  return result;
};

module.exports = {
  createCourrier,
  updateStatus,
  readCourrierUser,
  readCourrierAdmin,
};

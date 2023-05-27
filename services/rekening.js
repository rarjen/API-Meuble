const { Rekening, Payment } = require("../models");
const { Op } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../errors");

const createRekening = async (req) => {
  const { payment_id, rekening } = req.body;

  const checkPayment = await Payment.findOne({ where: { id: payment_id } });
  if (!checkPayment) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }

  const checkDuplicate = await Rekening.findOne({ where: { payment_id } });
  if (checkDuplicate) {
    throw new BadRequestError(`Nomer Rekening sudah ada!`);
  }

  const result = await Rekening.create({ payment_id, rekening });

  return result;
};

const updateRekening = async (req) => {
  const { rekening_id } = req.params;
  const { rekening } = req.body;

  const checkRekening = await Rekening.findOne({
    where: {
      rekening,
      id: { [Op.ne]: rekening_id },
    },
  });

  if (checkRekening) {
    throw new BadRequestError("Rekening sudah ada!");
  }

  const result = await Rekening.update([rekening]);

  return result;
};

module.exports = { createRekening, updateRekening };

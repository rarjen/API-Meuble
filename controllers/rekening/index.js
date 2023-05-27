const { createRekening, updateRekening } = require("../../services/rekening");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createRekening(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Create Rekening!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateRekening(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Update Rekening!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, update };

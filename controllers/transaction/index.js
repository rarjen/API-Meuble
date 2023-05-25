const {
  createTransaction,
  readTransaction,
} = require("../../services/transaction");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createTransaction(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Create Transaction!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const indexAdmin = async (req, res, next) => {
  try {
    const result = await readTransaction(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Transaction!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, indexAdmin };

const { getTotal, getSale } = require("../../services/sale");

const { StatusCodes } = require("http-status-codes");

const total = async (req, res, next) => {
  try {
    const result = await getTotal();

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Sale!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getSale(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Sale!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { total, index };

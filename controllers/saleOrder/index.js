const { getTotalCustom } = require("../../services/saleOrder");

const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getTotalCustom();

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Data!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index };

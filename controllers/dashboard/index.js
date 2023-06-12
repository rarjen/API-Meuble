const { getData } = require("../../services/dashboard");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getData(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index };

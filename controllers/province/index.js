const { getProvince, getAllProvince } = require("../../services/getProvince");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getAllProvince();

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all province",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getProvince(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get province",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index, show };

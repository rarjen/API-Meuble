const { createOrUpdateCoordinate } = require("../../services/coordinate");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createOrUpdateCoordinate(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success create Coordinate!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};

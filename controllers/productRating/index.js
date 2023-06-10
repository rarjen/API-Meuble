const { updateOrCreateRating } = require("../../services/productRating");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await updateOrCreateRating(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create rating",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};

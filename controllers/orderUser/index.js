const { create } = require("../../services/orderUser");

const { StatusCodes } = require("http-status-codes");

const createMenu = async (req, res, next) => {
  try {
    const result = await create(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Create Menu!",
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMenu,
};

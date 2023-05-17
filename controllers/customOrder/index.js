const {
  createCustomOrder,
  readByAdmin,
  readByUser,
  cancelByUser,
  cancelByAdmin,
} = require("../../services/customOrder");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createCustomOrder(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create Custom Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const readCustomOrderByAdmin = async (req, res, next) => {
  try {
    const result = await readByAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get Custom Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const readCustomOrderByUser = async (req, res, next) => {
  try {
    const result = await readByUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get Custom Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const cancelOrderByUser = async (req, res, next) => {
  try {
    const result = await cancelByUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success cancel Custom Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const cancelOrderByAdmin = async (req, res, next) => {
  try {
    const result = await cancelByAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success cancel Custom Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  readCustomOrderByAdmin,
  readCustomOrderByUser,
  cancelOrderByUser,
  cancelOrderByAdmin,
};

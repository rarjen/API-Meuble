const {
  createOrder,
  readOrderByAdmin,
  readOrderByUser,
  deleteOrder,
  cancelOrder,
} = require("../../services/order");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createOrder(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const adminRead = async (req, res, next) => {
  try {
    const result = await readOrderByAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const userRead = async (req, res, next) => {
  try {
    const result = await readOrderByUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteOrder(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const cancel_order = async (req, res, next) => {
  try {
    const result = await cancelOrder(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success cancel order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, adminRead, userRead, destroy, cancel_order };

const {
  createCustomOrder,
  readByAdmin,
  readByUser,
  cancelByUser,
  cancelByAdmin,
  acceptByAdmin,
  updateByAdmin,
  createPriceAdmin,
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

const acceptOrderByAdmin = async (req, res, next) => {
  try {
    const result = await acceptByAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success accept Custom Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateShippingByAdmin = async (req, res, next) => {
  try {
    const result = await updateByAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Order is on shipment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createPriceByAdmin = async (req, res, next) => {
  try {
    const result = await createPriceAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Edit Price Order",
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
  acceptOrderByAdmin,
  updateShippingByAdmin,
  createPriceByAdmin,
};

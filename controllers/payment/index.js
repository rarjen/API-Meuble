const {
  createPayment,
  getAllPayments,
  getOnePayment,
  editPayment,
  deletePayment,
} = require("../../services/payment");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createPayment(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllPayments();

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all payments",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getOnePayment(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editPayment(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success edit payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deletePayment(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, show, update, destroy };

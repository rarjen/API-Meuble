const {
  createPayment,
  getAllPayments,
  getOnePayment,
  editPayment,
  editStatusPayment,
  uploadOrUpdateImg,
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
    const result = await getAllPayments(req);

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

const updateStatus = async (req, res, next) => {
  try {
    const result = await editStatusPayment(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update status payment",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const uploadUpdateImg = async (req, res, next) => {
  try {
    const result = await uploadOrUpdateImg(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success upload/update picture",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
  show,
  update,
  updateStatus,
  uploadUpdateImg,
};

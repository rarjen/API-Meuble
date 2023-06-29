const {
  createTransaction,
  readTransactionAdmin,
  readTransactionUser,
  readOneTransaction,
  cancelOrderAdmin,
  cancelOrderUser,
  updateCustomTransactionAdmin,
  acceptCustomOrderAdmin,
  updateStatusPayment,
  inputResi,
  updateDone,
} = require("../../services/transactionCustomOrder");

const { Payment } = require("../../models");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createTransaction(req);
    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Transaction Custom Order Created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const indexAdmin = async (req, res, next) => {
  try {
    const result = await readTransactionAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const indexUser = async (req, res, next) => {
  try {
    const result = await readTransactionUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await readOneTransaction(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const cancelAdmin = async (req, res, next) => {
  try {
    const result = await cancelOrderAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Cancel Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const cancelUser = async (req, res, next) => {
  try {
    const result = await cancelOrderUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Cancel Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const editAdmin = async (req, res, next) => {
  try {
    const result = await updateCustomTransactionAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Edit Detail Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const acceptOrder = async (req, res, next) => {
  try {
    const result = await acceptCustomOrderAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Accept Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const result = await updateStatusPayment(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Update Payment Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const inputResiAdmin = async (req, res, next) => {
  try {
    const result = await inputResi(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Input Resi",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateDoneAdmin = async (req, res, next) => {
  try {
    const result = await updateDone(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Update Status Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  indexAdmin,
  indexUser,
  show,
  cancelAdmin,
  cancelUser,
  editAdmin,
  acceptOrder,
  updatePayment,
  inputResiAdmin,
  updateDoneAdmin,
};

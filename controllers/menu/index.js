const { create, update, getAll, getOne } = require("../../services/menu");

const { StatusCodes } = require("http-status-codes");

const createMenu = async (req, res, next) => {
  try {
    const result = await create(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Create Menu!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const result = await update(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Update Menu!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllMenu = async (req, res, next) => {
  try {
    const result = await getAll();

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get All Menu!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOneMenu = async (req, res, next) => {
  try {
    const result = await getOneMenu(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get All Menu!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMenu,
  updateMenu,
  getAllMenu,
  getOne,
};

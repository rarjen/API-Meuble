const {
  createSize,
  readAllSize,
  readOneSize,
  editSize,
  destroySize,
  readByCategory,
} = require("../../services/size");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createSize(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Create Size!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await readAllSize(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get All Size!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await readOneSize(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Size!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editSize(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Update Size!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await destroySize(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Delete Size!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const readSizeByCategory = async (req, res, next) => {
  try {
    const result = await readByCategory(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Size!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, show, update, destroy, readSizeByCategory };

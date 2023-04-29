const {
  createProduct,
  updateProduct,
  updateStatusProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
} = require("../../services/product");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createProduct(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create product",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProducts = async (req, res, next) => {
  try {
    const result = await updateProduct(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success update product",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const result = await updateStatusProduct(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update status",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllProducts(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success show data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getOneProduct(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success show data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteProduct(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, updateProducts, updateStatus, index, show, destroy };

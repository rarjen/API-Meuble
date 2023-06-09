const {
  createProduct,
  updateProduct,
  updateStatusProduct,
  getAllProductsByAdmin,
  getOneProduct,
  deleteProduct,
  getByCategory,
  getAllProductsByUser,
  getBestSellerProduct
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

const getByAdmin = async (req, res, next) => {
  try {
    const result = await getAllProductsByAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success show data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getByUser = async (req, res, next) => {
  try {
    const result = await getAllProductsByUser(req);

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

const getProductByCategory = async (req, res, next) => {
  try {
    const result = await getByCategory(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get product",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getBestSeller = async (req, res, next) => {
  try {
    const response = await getBestSellerProduct(req);
    return res.status(StatusCodes.OK).json({
      status: true,
      message: 'Success get best seller product',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  updateProducts,
  updateStatus,
  getByAdmin,
  show,
  destroy,
  getProductByCategory,
  getByUser,
  getBestSeller
};

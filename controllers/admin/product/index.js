const {
  createProduct,
  updateProduct,
  updateStatusProduct,
  getAllProducts,
  getOneProduct,
} = require("../../../services/product");

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

module.exports = { create };

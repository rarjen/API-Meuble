const {
  createCategory,
  getAllCategories,
  getOneCategory,
  editCategory,
} = require("../../services/category");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createCategory(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create category",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get all categories",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getOneCategory(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get category",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editCategory(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success edit category",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, show, update };

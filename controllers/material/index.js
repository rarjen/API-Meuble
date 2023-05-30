const {
  createMaterial,
  editMaterial,
  readAllMaterial,
  readOneMaterial,
  destroyMaterial,
  readByCategory,
} = require("../../services/material");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createMaterial(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Create Material!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await readAllMaterial(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get All Material!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await readOneMaterial(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Material!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editMaterial(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Update Material!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await destroyMaterial(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update status Material!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const readMaterialByCategory = async (req, res, next) => {
  try {
    const result = await readByCategory(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Delete Material!",
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
  destroy,
  readMaterialByCategory,
};

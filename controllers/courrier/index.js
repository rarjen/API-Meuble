const {
  createCourrier,
  updateStatus,
  readCourrierAdmin,
  readCourrierUser,
} = require("../../services/courrier");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createCourrier(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create Courrier",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateStatus(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update Courrier",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const indexByAdmin = async (req, res, next) => {
  try {
    const result = await readCourrierAdmin(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get Courrier",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const indexByUser = async (req, res, next) => {
  try {
    const result = await readCourrierUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get Courrier",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  indexByAdmin,
  indexByUser,
};

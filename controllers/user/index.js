const { updateBio, getAllUser, getUser } = require("../../services/user");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getAllUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get data!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createBio = async (req, res, next) => {
  try {
    const result = await updateBio(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update bio!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserData = async (req, res, next) => {
  try {
    const result = await getUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get user!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  createBio,
  getUserData,
};

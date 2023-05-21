const {
  updateBio,
  getAllUser,
  resetPassword,
  createAddress,
  editAddress,
  getAddressUser,
} = require("../../services/user");
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

const createAddressUser = async (req, res, next) => {
  try {
    const result = await createAddress(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create addresss!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddressUser = async (req, res, next) => {
  try {
    const result = await editAddress(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success update addresss!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordUser = async (req, res, next) => {
  try {
    const result = await resetPassword(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success reset password!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const result = await getAddressUser(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get address!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  createBio,
  resetPasswordUser,
  createAddressUser,
  updateAddressUser,
  getAddress,
};

const {
  createAddress,
  editAddress,
  getAddressUser,
} = require("../../services/address");
const { StatusCodes } = require("http-status-codes");

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

module.exports = { createAddressUser, getAddress };

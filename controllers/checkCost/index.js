const { checkOngkir } = require("../../services/checkOngkir");
const { StatusCodes } = require("http-status-codes");

const ongkir = async (req, res, next) => {
  try {
    const result = await checkOngkir(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success create Custom Order",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ongkir,
};

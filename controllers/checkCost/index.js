const { checkOngkir, checkOngkirCod } = require("../../services/checkOngkir");
const { StatusCodes } = require("http-status-codes");

const ongkir = async (req, res, next) => {
  try {
    const result = await checkOngkir(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success check ongkir",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const cod = async (req, res, next) => {
  try {
    const result = await checkOngkirCod(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success check ongkir",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ongkir,
  cod,
};

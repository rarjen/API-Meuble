const { register, login } = require("../../services/auth");
const { StatusCodes } = require("http-status-codes");

const registerAccount = async (req, res, next) => {
  try {
    const result = await register(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Register",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginAccount = async (req, res, next) => {
  try {
    const result = await login(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Login",
      data: {
        email: result.email,
        token: result.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerAccount, loginAccount };

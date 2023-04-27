const { createRole, getUser } = require("../../services/role");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createRole(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Role created!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getUser();

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Data!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index };

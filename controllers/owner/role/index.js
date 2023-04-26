const { createRole } = require("../../../services/role");

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

module.exports = { create };

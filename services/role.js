const { Role, User } = require("../models");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createRole = async (req) => {
  const { role } = req.body;

  const checkRole = await Role.findOne({ where: { role: role.toUpperCase() } });

  if (checkRole) {
    throw new BadRequestError(`Role ${role} sudah ada!`);
  }

  const result = await Role.create({
    role: role.toUpperCase(),
  });

  return result;
};

const updateRole = async (req) => {
  const { role_id } = req.params;
  const { role } = req.body;

  const checkRole = await Role.findOne({ where: { role: role.toUpperCase() } });

  if (checkRole) {
    throw new BadRequestError(`Role ${role} sudah ada!`);
  }

  const result = await Role.update(
    {
      role: role.toUpperCase(),
    },
    { where: { id: role_id } }
  );

  return result;
};

const getAllRole = async () => {
  const result = await Role.findAll({});

  if (result <= 0) {
    return res.status(StatusCodes.OK).json({
      status: true,
      message: "No Data",
    });
  }

  return result;
};

const getOneRole = async (req) => {
  const { role_id } = req.params;

  const result = await Role.findOne({ where: { id: role_id } });
  if (!result) {
    throw new BadRequestError(`Tidak ada role dengan id: ${role_id}`);
  }

  return result;
};

const deleteRole = async (req) => {
  const { role_id } = req.params;

  const checkRole = await Role.findOne({ where: { id: role_id } });

  if (!checkRole) {
    throw new BadRequestError(`TIdak ada role dengan id: ${role_id}`);
  }

  const result = await Role.destroy({ where: { id: role_id } });

  return result;
};

const getUser = async () => {
  const result = await User.findAll({
    include: [
      {
        model: Role,
        as: "role",
      },
    ],
  });

  return result;
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  getAllRole,
  getOneRole,
  getUser,
};

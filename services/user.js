const { Role, User } = require("../models");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require("sequelize");

const updateBio = async (req) => {
  const user = req.user;
  const { first_name, last_name, email, mobile, address } = req.body;

  const checkMobile = await User.findOne({
    where: {
      mobile: mobile,
      id: { [Op.ne]: user.id },
    },
  });

  if (checkMobile) {
    throw new BadRequestError("Email / Nomer Telepon sudah terdaftar!");
  }

  const checkEmail = await User.findOne({
    where: {
      email: email,
      id: { [Op.ne]: user.id },
    },
  });

  if (checkEmail) {
    throw new BadRequestError("Email / Nomer Telepon sudah terdaftar!");
  }

  const result = await User.update(
    { first_name, last_name, email, mobile, address },
    { where: { id: user.id } }
  );

  return result;
};

const getAllUser = async (req) => {
  let { page = 1, limit } = req.query;

  if (!limit) {
    limit = 10;

    const pageNumber = parseInt(page);
    const limitPage = parseInt(limit);
    const offset = pageNumber * limitPage - limitPage;
    const allUser = await User.count();
    const totalPage = Math.ceil(allUser / limit);
    const result = await User.findAll({
      offset: offset,
      limit: limitPage,
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    return {
      data: result,
      pageNumber: pageNumber,
      limitPage: limitPage,
      totalRows: allUser,
      totalPage: totalPage,
    };
  }
  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allUser = await User.count();
  const totalPage = Math.ceil(allUser / limit);

  const result = await User.findAll({
    offset: offset,
    limit: limitPage,
    include: [
      {
        model: Role,
        as: "role",
      },
    ],
  });
  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allUser,
    totalPage: totalPage,
  };
};

const resetPassword = async (req) => {
  const user = req.user;
  const { new_password, confirm_password } = req.body;

  const schema = {
    new_password: { type: "string", min: 6 },
    confirm_password: { type: "string", min: 6 },
  };
  const check = await v.compile(schema);
  const validate = check({
    new_password: `${new_password}`,
    confirm_password: `${confirm_password}`,
  });
  if (validate.length > 0) {
    throw new BadRequestError("Password at least 6 characters!");
  }

  if (new_password !== confirm_password) {
    throw new BadRequestError("Password harus sama!");
  }

  const encryptedPassword = await bcrypt.hash(new_password, 10);

  const result = await User.update(
    { password: encryptedPassword },
    { where: { id: user.id } }
  );

  return result;
};

module.exports = { getAllUser, updateBio, resetPassword };

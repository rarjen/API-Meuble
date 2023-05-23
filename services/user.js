const { Role, User, Address, City, Province } = require("../models");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require("sequelize");

const updateBio = async (req) => {
  const user = req.user;
  const { first_name, last_name, email, mobile } = req.body;

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
    { first_name, last_name, email, mobile },
    { where: { id: user.id } }
  );

  return result;
};

const getAllUser = async (req) => {
  const { search, page = 1, limit = 10 } = req.query;

  let where = {};
  if (search) {
    where = {
      [Op.or]: [
        { email: { [Op.like]: "%" + search + "%" } },
        { first_name: { [Op.like]: "%" + search + "%" } },
        { last_name: { [Op.like]: "%" + search + "%" } },
        { mobile: { [Op.like]: "%" + search + "%" } },
      ],
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
    where,
    include: [
      {
        model: Role,
        as: "role",
      },
      {
        model: Address,
        as: "address",
        include: [
          {
            model: Province,
            as: "province",
          },
          {
            model: City,
            as: "city",
          },
        ],
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

module.exports = {
  getAllUser,
  updateBio,
  resetPassword,
};

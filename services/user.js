const { Role, User, Address } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
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

const createAddress = async (req) => {
  const user = req.user;
  const { province_id, city_id, address } = req.body;

  const checkAddress = await Address.findOne({ where: { user_id: user.id } });
  if (checkAddress) {
    throw new BadRequestError(`Anda hanya boleh memiliki 1 alamat`);
  }

  const result = await Address.create({
    user_id: user.id,
    province_id,
    city_id,
    address,
  });

  await User.update({ address_id: result.id }, { where: { id: user.id } });

  return result;
};

const editAddress = async (req) => {
  const { address_id } = req.query;
  const { province_id, city_id, address } = req.body;

  const checkAddress = await Address.findOne({ where: { id: address_id } });
  if (!checkAddress) {
    throw new NotFoundError(`Tidak ada address dengan id: ${address_id}`);
  }

  const result = await Address.update(
    { province_id, city_id, address },
    { where: { id: address_id } }
  );

  return result;
};

const getAddressUser = async (req) => {
  const user = req.user;

  const result = await Address.findOne({ where: { user_id: user.id } });

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

module.exports = {
  getAllUser,
  updateBio,
  resetPassword,
  createAddress,
  editAddress,
  getAddressUser,
};

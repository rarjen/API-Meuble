const {
  Role,
  User,
  Address,
  City,
  Province,
  Coordinate,
  Avatar,
} = require("../models");
const { BadRequestError } = require("../errors");

const { Op, fn } = require("sequelize");

const updateBio = async (req) => {
  const user = req.user;
  const { first_name, last_name, mobile } = req.body;

  const checkMobile = await User.findOne({
    where: {
      mobile: mobile,
      id: { [Op.ne]: user.id },
    },
  });

  if (checkMobile) {
    throw new BadRequestError("Nomer Telepon sudah terdaftar!");
  }

  const result = await User.update(
    { first_name, last_name, mobile },
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
        { email: { [Op.like]: fn("LOWER", `%${search}%`) } },
        { first_name: { [Op.like]: fn("LOWER", `%${search}%`) } },
        { last_name: { [Op.like]: fn("LOWER", `%${search}%`) } },
        { mobile: { [Op.like]: fn("LOWER", `%${search}%`) } },
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
          {
            model: Coordinate,
            as: "coordinate",
          },
        ],
      },
      {
        model: Avatar,
        as: "avatar",
        attributes: ["img_url"],
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

module.exports = {
  getAllUser,
  updateBio,
};

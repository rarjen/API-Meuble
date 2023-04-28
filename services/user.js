const { Role, User } = require("../models");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const index = async (req) => {
  const { page, limit } = req.query;

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

module.exports = { index };

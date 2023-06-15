const { Category } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { Op } = require("sequelize");

const createCategory = async (req) => {
  const { category } = req.body;

  const checkCategory = await Category.findOne({ where: { category } });
  if (checkCategory) {
    throw new BadRequestError("Category sudah ada!");
  }

  const result = await Category.create({ category });

  return result;
};

const getAllCategories = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allCategory = await Category.count();
  const totalPage = Math.ceil(allCategory / limit);

  const result = await Category.findAll({ offset: offset, limit: limitPage });

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allCategory,
    totalPage: totalPage,
  };
};

const getOneCategory = async (req) => {
  const { category_id } = req.params;

  const result = await Category.findOne({ where: { id: category_id } });

  if (!result) {
    throw new NotFoundError(`Tidak ada category dengan id: ${category_id}`);
  }

  return result;
};

const editCategory = async (req) => {
  const { category_id } = req.params;
  const { category } = req.body;

  const checkCategory = await Category.findOne({ where: { id: category_id } });
  if (!checkCategory) {
    throw new NotFoundError(`Tidak ada Category dengan id: ${category_id}`);
  }

  const checkDuplicate = await Category.findOne({
    where: { category },
    id: { [Op.ne]: category_id },
  });

  if (checkDuplicate) {
    throw new BadRequestError(`Category sudah ada!`);
  }

  const result = await Category.update(
    { category },
    { where: { id: category_id } }
  );

  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
  getOneCategory,
  editCategory,
};

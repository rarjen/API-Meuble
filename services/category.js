const { Category } = require("../models");
const { NotFoundError } = require("../errors");
const { CATEGORY } = require("../utils/enum");
const querySort = require("../utils/querySort");

const createCategory = async (req) => {
  const { category } = req.body;

  const result = await Category.create({ category, status: CATEGORY.ACTIVE });

  return result;
};

const getAllCategories = async (req) => {
  const { page = 1, limit = 10, sort } = req.query;

  const dataSort = querySort(sort);

  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allCategory = await Category.count({
    where: { status: CATEGORY.ACTIVE },
  });
  const totalPage = Math.ceil(allCategory / limit);

  const result = await Category.findAll({
    offset: offset,
    limit: limitPage,
    where: { status: CATEGORY.ACTIVE },
    order: dataSort,
  });

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

  const result = await Category.findOne({
    where: { id: category_id, status: CATEGORY.ACTIVE },
  });

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

  const result = await Category.update(
    { category },
    { where: { id: category_id } }
  );

  return result;
};

const deleteCategory = async (req) => {
  const { category_id } = req.params;

  const checkCategory = await Category.findOne({ where: { id: category_id } });
  if (!checkCategory || checkCategory.status === CATEGORY.INACTIVE) {
    throw new NotFoundError("Category tidak ada!");
  }

  const result = await Category.update(
    { status: CATEGORY.INACTIVE },
    { where: { id: category_id } }
  );

  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
  getOneCategory,
  editCategory,
  deleteCategory,
};

const { Product, Category } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
// const Sequelize = require("sequelize");
const { PRODUCT } = require("../utils/enum");
const { Op } = require("sequelize");

const createProduct = async (req) => {
  const {
    category_id,
    brand,
    nama,
    deskripsi,
    stock,
    harga,
    status = true,
  } = req.body;

  const result = await Product.create({
    category_id,
    brand,
    nama,
    deskripsi,
    stock,
    harga,
    status,
  });

  return result;
};

const updateProduct = async (req) => {
  const { id_product } = req.params;
  const { category_id, brand, nama, deskripsi, stock, harga, status } =
    req.body;

  const productExist = await Product.findOne({ where: { id: id_product } });

  if (!productExist) {
    throw new BadRequestError(`Tidak ada product dengan id: ${id_product}`);
  }

  if (stock <= 0) {
    const result = await Product.update(
      {
        category_id,
        brand,
        nama,
        deskripsi,
        stock,
        harga,
        status: false,
      },
      { where: { id: id_product } }
    );

    return result;
  }

  const result = await Product.update(
    {
      category_id,
      brand,
      nama,
      deskripsi,
      stock,
      harga,
      status,
    },
    { where: { id: id_product } }
  );

  return result;
};

const updateStatusProduct = async (req) => {
  const { product_id } = req.params;

  const checkProduct = await Product.findOne({ where: { id: product_id } });
  if (!checkProduct) {
    throw new BadRequestError(`Tidak ada product dengan id ${product_id}`);
  }

  if (checkProduct.status === PRODUCT.ACTIVE) {
    const result = await Product.update(
      { status: PRODUCT.INACTIVE },
      { where: { id: product_id } }
    );

    return result;
  }

  const result = await Product.update(
    { status: PRODUCT.ACTIVE },
    { where: { id: product_id } }
  );

  return result;
};

const getOneProduct = async (req) => {
  const { product_id } = req.params;

  const checkProduct = await Product.findOne({ where: { id: product_id } });
  if (!checkProduct) {
    throw new BadRequestError(`Tidak ada product dengan id: ${product_id}`);
  }

  const result = await Product.findOne({ where: { id: product_id } });

  return result;
};

const getAllProducts = async (req) => {
  const { status, search, page = 1, limit = 10 } = req.query;

  let where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where = {
      [Op.or]: [
        { nama: { [Op.like]: "%" + search + "%" } },
        { brand: { [Op.like]: "%" + search + "%" } },
      ],
    };
  }

  if (search && status) {
    where = {
      status: status,
      [Op.or]: [
        { nama: { [Op.like]: "%" + search + "%" } },
        { brand: { [Op.like]: "%" + search + "%" } },
      ],
    };
  }

  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allProducts = await Product.count();
  const totalPage = Math.ceil(allProducts / limit);

  const result = await Product.findAll({
    offset: offset,
    limit: limitPage,
    where,
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
  });

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allProducts,
    totalPage: totalPage,
  };

  // if (search) {
  //   const result = await Product.findAll({
  //     where: {
  //       nama: { [Op.like]: `%${search}%` },
  //       brand: { [Op.like]: `%${search}%` },
  //     },
  //   });

  //   return result;
  // }
};

const getByCategory = async (req) => {
  const { category_id } = req.params;

  const checkCategory = await Category.findOne({ where: { id: category_id } });
  if (!checkCategory) {
    throw new NotFoundError(`Tidak ada category dengan id: ${category_id}`);
  }

  const result = await Product.findAll({
    where: { category_id, status: PRODUCT.ACTIVE },
  });

  return result;
};

const deleteProduct = async (req) => {
  const { product_id } = req.params;

  const checkProduct = await Product.findOne({ where: { id: product_id } });

  if (!checkProduct) {
    throw new BadRequestError(`Tidak ada product dengan id: ${product_id}`);
  }

  const result = await Product.destroy({ where: { id: product_id } });

  return result;
};

module.exports = {
  createProduct,
  updateProduct,
  updateStatusProduct,
  getOneProduct,
  getAllProducts,
  deleteProduct,
  getByCategory,
};

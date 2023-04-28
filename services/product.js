const { Product } = require("../models");
const { BadRequestError } = require("../errors");
const Sequelize = require("sequelize");
const { PRODUCT } = require("../utils/enum");
const Op = Sequelize.Op;

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
  let status;
  const checkProduct = await Product.findOne({ where: { id: product_id } });
  if (!checkProduct) {
    throw new BadRequestError(`Tidak ada product dengan id ${product_id}`);
  }

  if (checkProduct.status === PRODUCT.ACTIVE) {
    status = PRODUCT.INACTIVE;
    const result = await Product.update(
      { status },
      { where: { id: product_id } }
    );

    return result;
  }

  status = PRODUCT.ACTIVE;
  const result = await Product.update(
    { status },
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
  const { status, search, page, limit } = req.query;

  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allProducts = await Product.count();
  const totalPage = Math.ceil(allProducts / limit);

  if (status) {
    const result = await Product.findAll({
      offset: offset,
      limit: limitPage,
      where: { status },
    });

    return {
      data: result,
      pageNumber: pageNumber,
      limitPage: limitPage,
      totalRows: allProducts,
      totalPage: totalPage,
    };
  }

  if (flightPagination <= 0) {
    return res.status(400).json({
      status: false,
      message: "No Flight",
    });
  }

  // if (search) {
  //   const result = await Product.findAll({
  //     where: {
  //       nama: { [Op.like]: `%${search}%` },
  //       brand: { [Op.like]: `%${search}%` },
  //     },
  //   });

  //   return result;
  // }

  const result = await Product.findAll({ offset: offset, limit: limitPage });

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allProducts,
    totalPage: totalPage,
  };
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
};

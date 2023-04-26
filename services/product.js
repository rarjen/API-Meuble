const { Product } = require("../models");
const { BadRequestError } = require("../errors");
const Sequelize = require("sequelize");
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
  const { status } = req.body;

  const checkProduct = await Product.findOne({ where: { id: product_id } });
  if (!checkProduct) {
    throw new BadRequestError(`Tidak ada product dengan id ${product_id}`);
  }

  if (checkProduct.status === true) {
    status = false;
    const result = await Product.update(
      { status },
      { where: { id: product_id } }
    );

    return result;
  }

  status = true;
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
  const { status, search } = req.query;

  if (status) {
    const result = await Product.findAll({ where: { status } });

    return result;
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

  const result = await Product.findAll({});

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
};

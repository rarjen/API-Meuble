const {
  Product,
  Category,
  Product_img,
  Thumbnail_product_img,
  Product_rating,
} = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { PRODUCT } = require("../utils/enum");
const { Op, fn, col, literal } = require("sequelize");

const createProduct = async (req) => {
  const { category_id, brand, nama, deskripsi, stock, harga, weight } =
    req.body;

  const result = await Product.create({
    category_id,
    brand,
    nama,
    deskripsi,
    stock,
    harga,
    weight,
    status: PRODUCT.ACTIVE,
    total_sold: 0,
  });

  return result;
};

const updateProduct = async (req) => {
  const { product_id } = req.params;
  const { category_id, brand, nama, deskripsi, stock, weight, harga, status } =
    req.body;

  const productExist = await Product.findOne({ where: { id: product_id } });

  if (!productExist) {
    throw new NotFoundError(`Tidak ada product dengan id: ${product_id}`);
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
        weight,
        status,
      },
      { where: { id: product_id } }
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
    { where: { id: product_id } }
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

  const result = await Product.findOne({
    where: { id: product_id },
    include: [
      {
        model: Product_img,
        as: "images",
      },
      {
        model: Thumbnail_product_img,
        as: "thumbnail",
      },
    ],
  });

  return result;
};

const getAllProductsByAdmin = async (req) => {
  const { status, search, page = 1, limit = 10 } = req.query;

  let where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where = {
      [Op.or]: [
        { nama: { [Op.like]: fn("LOWER", `%${search}%`) } },
        { brand: { [Op.like]: fn("LOWER", `%${search}%`) } },
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
  const allProducts = await Product.count({
    where: { status: PRODUCT.ACTIVE },
  });
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
      {
        model: Product_img,
        as: "images",
      },
      {
        model: Thumbnail_product_img,
        as: "thumbnail",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allProducts,
    totalPage: totalPage,
  };
};

const getAllProductsByUser = async (req) => {
  const { search, category_id } = req.query;

  let where = {
    status: PRODUCT.ACTIVE,
  };

  if (search && category_id) {
    where[Op.and] = [
      {
        [Op.or]: [
          { nama: { [Op.like]: fn("LOWER", `%${search}%`) } },
          { brand: { [Op.like]: fn("LOWER", `%${search}%`) } },
        ],
      },
      { category_id: parseInt(category_id) },
    ];
  } else if (search) {
    where[Op.or] = [
      { nama: { [Op.like]: fn("LOWER", `%${search}%`) } },
      { brand: { [Op.like]: fn("LOWER", `%${search}%`) } },
    ];
  } else if (category_id) {
    where.category_id = parseInt(category_id);
  }

  const result = await Product.findAll({
    where,
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["category"],
      },
      {
        model: Product_img,
        as: "images",
        attributes: ["img_url"],
        separate: true,
      },
      {
        model: Thumbnail_product_img,
        as: "thumbnail",
        attributes: ["img_url"],
      },
      {
        model: Product_rating,
        as: "rating",
        attributes: [],
      },
    ],
    attributes: [
      "id",
      "nama",
      "weight",
      "deskripsi",
      "stock",
      "harga",
      "total_sold",
      [fn("AVG", col("`rating`.`rating`")), "averageRating"],
      [literal("COUNT(DISTINCT `rating`.`id`)"), "totalRatings"],
    ],
    group: ["Product.id"],
    order: [["createdAt", "DESC"]],
  });

  return result;
};

const getByCategory = async (req) => {
  const { category_id } = req.params;

  const checkCategory = await Category.findOne({ where: { id: category_id } });
  if (!checkCategory) {
    throw new NotFoundError(`Tidak ada category dengan id: ${category_id}`);
  }

  const result = await Product.findAll({
    where: { category_id, status: PRODUCT.ACTIVE },
    include: [
      {
        model: Category,
        as: "category",
      },
      {
        model: Product_img,
        as: "images",
      },
      {
        model: Thumbnail_product_img,
        as: "thumbnail",
      },
    ],
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


const getBestSellerProduct = async () => {
  const products = await Product.findAll({
    where: { status: PRODUCT.ACTIVE },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["category"],
      },
      {
        model: Product_img,
        as: "images",
        attributes: ["img_url"],
        separate: true,
      },
      {
        model: Thumbnail_product_img,
        as: "thumbnail",
        attributes: ["img_url"],
      },
      {
        model: Product_rating,
        as: "rating",
        attributes: [],
      },
    ],
    order: [["total_sold", "DESC"]],
    limit: 6,
  });
  return products;
};

module.exports = {
  createProduct,
  updateProduct,
  updateStatusProduct,
  getOneProduct,
  getAllProductsByAdmin,
  deleteProduct,
  getByCategory,
  getBestSellerProduct,
  getAllProductsByUser,
};

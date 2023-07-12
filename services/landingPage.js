const { Product, User, Payment, Category, Product_img, Thumbnail_product_img, Product_rating } = require('../models');
const { Op, fn, col, literal } = require("sequelize");

module.exports = {
  getTotalData: async (req) => {
    const totalProduct = await Product.count();
    const totalUser = await User.count();
    const totalCategory = await Category.count();
    const totalPayment = await Payment.count();
    return {
      total_product: totalProduct,
      total_user: totalUser,
      total_category: totalCategory,
      total_payment: totalPayment
    }
  },
  getNewProduct: async (req) => {
    const response = await Product.findAll({
      limit: 3,
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
      group: ["Product.id"],
      order: [["createdAt", "DESC"]],
    });
    return response;
  }
}
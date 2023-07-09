module.exports = {
  getTotalData: async (req, res, next) => {
    try {
      const totalProduct = await Product.count();
      const totalUser = await User.count();
      const totalCategory = await Category.count();
      const totalPayment = await Payment.count();
      const response = {
        total_product: totalProduct,
        total_user: totalUser,
        total_category: totalCategory,
        total_payment: totalPayment
      }
    } catch (error) {
      next(error)
    }
  }
}
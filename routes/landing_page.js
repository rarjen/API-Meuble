const router = require('express').Router();
const { getTotalData, getNewProduct } = require('../services/landingPage');
router.get('/', async (req, res, next) => {
  try {
    const response = await getTotalData(req);
    return res.status(200).json({
      status: true,
      message: 'Success get product',
      data: response
    })
  } catch (error) {
    next(error);
  }
})

router.get('/newProduct', async(req, res, next) => {
  try {
    const response = await getNewProduct(req);
    return res.status(200).json({
      status: true,
      message: "Success get new product",
      data: response
    })
  } catch (error) {
    next(error);
  }
})


module.exports = router;
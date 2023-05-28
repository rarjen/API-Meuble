const { uploadProductImage } = require("../../services/uploadProductPicture");
const { StatusCodes } = require("http-status-codes");

const upload = async (req, res, next) => {
  try {
    const result = await uploadProductImage(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Upload Image Transaction!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { upload };

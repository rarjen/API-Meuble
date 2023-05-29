const {
  uploadProductImage,
  uploadProductThumbnail,
} = require("../../services/uploadProductPicture");
const { StatusCodes } = require("http-status-codes");

const upload = async (req, res, next) => {
  try {
    const result = await uploadProductImage(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Upload Images!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const uploadThumbnail = async (req, res, next) => {
  try {
    const result = await uploadProductThumbnail(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Upload Image!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, uploadThumbnail };

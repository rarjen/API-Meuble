const { uploadReferenceImg } = require("../../services/uploadReferencePicture");
const { StatusCodes } = require("http-status-codes");

const upload = async (req, res, next) => {
  try {
    const result = await uploadReferenceImg(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success Upload Images!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { upload };

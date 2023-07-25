const { Product_img, Product, Thumbnail_product_img } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");
const {
  deleteSingleImg,
  deleteBulkImg,
} = require("../utils/media/deleteImage");
const uploadImgPayment = require("../utils/media/uploadImgPayment");

const uploadProductImage = async (req) => {
  const { product_id } = req.body;
  const fileUrls = [];
  const idFiles = [];

  if (req.files.length > 5) {
    throw new BadRequestError("Max 5 gambar!");
  }

  const checkProduct = await Product.findOne({
    where: { id: product_id },
    include: [{ model: Product_img, as: "images" }],
  });

  if (!checkProduct) {
    throw new NotFoundError(`Tidak ada product dengan id: ${product_id}`);
  }

  if (checkProduct.images.length <= 0) {
    checkProduct.images.forEach((dataImage) => {
      idFiles.push(dataImage.imagekit_id);
    });

    await deleteBulkImg(idFiles);

    await Product_img.destroy({
      where: { imagekit_id: idFiles },
    });

    for (const file of req.files) {
      const uploadData = await uploadImgPayment(file.buffer.toString("base64"));

      await Product_img.create({
        product_id,
        img_url: uploadData.url,
        imagekit_id: uploadData.uploadFile.fileId,
      });

      fileUrls.push(uploadData.url);
    }

    return fileUrls;
  }

  for (const file of req.files) {
    const uploadData = await uploadImgPayment(file.buffer.toString("base64"));

    await Product_img.create({
      product_id,
      img_url: uploadData.url,
      imagekit_id: uploadData.uploadFile.fileId,
    });

    fileUrls.push(uploadData.url);
  }

  return fileUrls;
};

const uploadProductThumbnail = async (req) => {
  const { product_id } = req.body;
  const file = req.file.buffer.toString("base64");

  const checkProduct = await Product.findOne({
    include: {
      model: Thumbnail_product_img,
      as: "thumbnail",
    },
    where: { id: product_id },
  });
  if (!checkProduct) {
    throw new NotFoundError(`Tidak ada product dengan id: ${product_id}`);
  }

  if (checkProduct.thumbnail) {
    await deleteSingleImg(checkProduct.thumbnail.imagekit_id);
    const dataUpload = await uploadImgPayment(file);
    const result = await Thumbnail_product_img.update(
      {
        img_url: dataUpload.url,
        imagekit_id: dataUpload.uploadFile.fileId,
      },
      { where: { product_id } }
    );

    return result;
  }

  const dataUpload = await uploadImgPayment(file);

  const result = await Thumbnail_product_img.create({
    product_id,
    img_url: dataUpload.url,
    imagekit_id: dataUpload.uploadFile.fileId,
  });

  return result;
};

module.exports = { uploadProductImage, uploadProductThumbnail };

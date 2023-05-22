const imagekit = require("./imagekit");

const uploadImgPayment = async (file) => {
  try {
    const uploadFile = await imagekit.upload({
      file,
      fileName: `picture`,
    });

    const data = {
      uploadFile: uploadFile,
      title: uploadFile.name,
      url: uploadFile.url,
    };

    // console.log(data.uploadFile.fileId);
    return data;
  } catch (error) {
    throw new error();
  }
};

module.exports = uploadImgPayment;

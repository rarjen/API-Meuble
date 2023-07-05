const imagekit = require("./imagekit");

const deleteSingleImg = async (fileId) => {
  try {
    const remove = await imagekit.deleteFile(fileId);

    return remove;
  } catch (error) {
    console.log(error);
  }
};

const deleteBulkImg = async (...fileId) => {
  try {
    const remove = await imagekit.bulkDeleteFiles(...fileId);

    return remove;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deleteSingleImg, deleteBulkImg };

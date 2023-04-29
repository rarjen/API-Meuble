const imagekit = require("./imagekit");

const deleteSingleImg = async (fileId) => {
  try {
    console.log(fileId);
    const remove = await imagekit.deleteFile(fileId);

    return remove;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deleteSingleImg };

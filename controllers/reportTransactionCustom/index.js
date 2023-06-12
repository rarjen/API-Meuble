const {
  downloadTransactionReport,
} = require("../../services/reportTransactionCustom");

const create = async (req, res, next) => {
  try {
    const result = await downloadTransactionReport(req);

    return res.download(result, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        return;
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create };

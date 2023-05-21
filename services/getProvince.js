const { NotFoundError } = require("../errors");
const { Province, City } = require("../models");

const getAllProvince = async () => {
  const result = await Province.findAll({
    include: [
      {
        model: City,
        as: "city",
      },
    ],
  });

  return result;
};

const getProvince = async (req) => {
  const { province_id } = req.params;

  const result = await Province.findOne({
    where: { id: province_id },
    include: [
      {
        model: City,
        as: "city",
      },
    ],
  });

  if (!result) {
    throw new NotFoundError(`Tidak ada provinsi dengan id: ${province_id}`);
  }

  return result;
};

module.exports = { getProvince, getAllProvince };

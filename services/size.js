const { Size } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { VARIANT } = require("../utils/enum");
const { Op } = require("sequelize");

const createSize = async (req) => {
  const { category_id, size } = req.body;

  const checkDuplicate = await Size.findOne({ where: { category_id, size } });

  if (checkDuplicate) {
    throw new BadRequestError(
      `Size dengan category id ${category_id} sudah ada!`
    );
  }

  const result = await Size.create({
    category_id,
    size,
    status: VARIANT.ACTIVE,
  });

  return result;
};

const editSize = async (req) => {
  const { size_id } = req.params;
  const { category_id, size } = req.body;

  const checkSize = await Size.findOne({ where: { id: size_id } });
  if (!checkSize) {
    throw new NotFoundError(`Tidak ada Size dengan id ${size_id}`);
  }

  const checkDuplicate = await Size.findOne({
    where: { category_id, size },
    id: { [Op.ne]: size_id },
  });

  if (checkDuplicate) {
    throw new BadRequestError(`Size sudah ada!`);
  }

  const result = await Category.update(
    { category },
    { where: { id: category_id } }
  );

  return result;
};

const readAllSize = async () => {
  const result = await Size.findAll({ where: { status: VARIANT.ACTIVE } });

  return result;
};

const readOneSize = async (req) => {
  const { size_id } = req.params;

  const result = await Size.findOne({
    where: { id: size_id, status: VARIANT.ACTIVE },
  });

  if (!result) {
    throw new NotFoundError(`Tidak ada size dengan id: ${size_id}`);
  }

  return result;
};

const destroySize = async (req) => {
  const { size_id } = req.params;

  const checkSize = await Size.findOne({ where: { id: size_id } });
  if (!checkSize) {
    throw new NotFoundError(`Tidak ada size dengan id: ${size_id}`);
  }

  const result = await Size.update(
    { status: VARIANT.INACTIVE },
    { where: { id: size_id } }
  );

  return result;
};

module.exports = {
  createSize,
  editSize,
  readAllSize,
  readOneSize,
  destroySize,
};

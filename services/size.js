const { Size, Category } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { VARIANT, ROLES } = require("../utils/enum");
const { Op } = require("sequelize");

const createSize = async (req) => {
  const { panjang, lebar, tinggi } = req.body;

  const checkDuplicate = await Size.findOne({
    where: { panjang, lebar, tinggi },
  });

  if (checkDuplicate) {
    throw new BadRequestError(`Size sudah ada!`);
  }

  const result = await Size.create({
    panjang,
    tinggi,
    lebar,
    status: VARIANT.ACTIVE,
  });

  return result;
};

const editSize = async (req) => {
  const { size_id } = req.params;
  const { panjang, lebar, tinggi } = req.body;

  const checkSize = await Size.findOne({ where: { id: size_id } });
  if (!checkSize) {
    throw new NotFoundError(`Tidak ada Size dengan id ${size_id}`);
  }

  const checkDuplicate = await Size.findOne({
    where: { panjang, lebar, tinggi },
    id: { [Op.ne]: size_id },
  });

  if (checkDuplicate) {
    throw new BadRequestError(`Size sudah ada!`);
  }

  const result = await Size.update(
    { panjang, lebar, tinggi },
    { where: { id: size_id } }
  );

  return result;
};

const readAllSize = async (req) => {
  const user = req.user;
  const { limit = 5, page = 1 } = req.query;

  let where = {};
  if (user.role === ROLES.BUYER) {
    where = {
      status: VARIANT.ACTIVE,
    };
  }

  const offset = (page - 1) * limit;
  const totalSize = await Size.count({ where });
  const totalPages = Math.ceil(totalSize / limit);

  const result = await Size.findAll({
    limit: Number(limit),
    offset: Number(offset),
    where,
  });

  return {
    limitPage: Number(limit),
    pageNumber: Number(page),
    totalPage: totalPages,
    totalRows: totalSize,
    data: result,
  };
};

const readOneSize = async (req) => {
  const { size_id } = req.params;
  const user = req.user;

  let where = {};

  if (user.role === ROLES.BUYER) {
    where = {
      id: size_id,
      status: VARIANT.ACTIVE,
    };
  }
  if (user.role === ROLES.ADMIN) {
    where = {
      id: size_id,
    };
  }

  const result = await Size.findOne({
    where,
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

  if (checkSize.status === VARIANT.ACTIVE) {
    const result = await Size.update(
      { status: VARIANT.INACTIVE },
      { where: { id: size_id } }
    );

    return result;
  }

  const result = await Size.update(
    { status: VARIANT.ACTIVE },
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

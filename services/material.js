const { Material, Category } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { VARIANT, ROLES } = require("../utils/enum");
const { Op } = require("sequelize");

const createMaterial = async (req) => {
  const { material, panjang, lebar, tebal, harga } = req.body;

  const checkDuplicate = await Material.findOne({
    where: { material, panjang, lebar, tebal },
  });

  if (checkDuplicate) {
    throw new BadRequestError(`Material sudah ada!`);
  }

  const result = await Material.create({
    material,
    panjang,
    lebar,
    tebal,
    harga,
    status: VARIANT.ACTIVE,
  });

  return result;
};

const editMaterial = async (req) => {
  const { material_id } = req.params;
  const { material, panjang, lebar, tebal, harga } = req.body;

  const checkMaterial = await Material.findOne({ where: { id: material_id } });
  if (!checkMaterial) {
    throw new NotFoundError(`Tidak ada Bahan dengan id ${material_id}`);
  }

  const checkDuplicate = await Material.findOne({
    where: { material, panjang, lebar, tebal },
    id: { [Op.ne]: material_id },
  });

  if (checkDuplicate) {
    throw new BadRequestError(`Bahan sudah ada!`);
  }

  const result = await Material.update(
    { material, panjang, lebar, tebal, harga },
    { where: { id: material_id } }
  );

  return result;
};

const readAllMaterial = async (req) => {
  const user = req.user;

  let where = {};

  if (user.role === ROLES.BUYER) {
    where = {
      status: VARIANT.ACTIVE,
    };
  }
  const result = await Material.findAll({
    where,
  });

  return result;
};

const readOneMaterial = async (req) => {
  const { material_id } = req.params;
  const user = req.user;
  let where = {};

  if (user.role === ROLES.BUYER) {
    where = {
      id: material_id,
      status: VARIANT.ACTIVE,
    };
  }
  if (user.role === ROLES.ADMIN) {
    where = {
      id: material_id,
    };
  }

  const result = await Material.findOne({
    where,
  });

  if (!result) {
    throw new NotFoundError(`Tidak ada material dengan id: ${material_id}`);
  }

  return result;
};

const destroyMaterial = async (req) => {
  const { material_id } = req.params;

  const checkMaterial = await Material.findOne({ where: { id: material_id } });
  if (!checkMaterial) {
    throw new NotFoundError(`Tidak ada material dengan id: ${material_id}`);
  }

  if (checkMaterial.status === VARIANT.ACTIVE) {
    const result = await Material.update(
      { status: VARIANT.INACTIVE },
      { where: { id: material_id } }
    );

    return result;
  }

  const result = await Material.update(
    { status: VARIANT.ACTIVE },
    { where: { id: material_id } }
  );

  return result;
};
module.exports = {
  createMaterial,
  editMaterial,
  readAllMaterial,
  readOneMaterial,
  destroyMaterial,
};

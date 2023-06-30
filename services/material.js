const { Material, Category } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { VARIANT, ROLES } = require("../utils/enum");
const { Op } = require("sequelize");

const createMaterial = async (req) => {
  const { material, panjang, lebar, tebal, harga, berat } = req.body;

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
    berat,
    harga,
    status: VARIANT.ACTIVE,
  });

  return result;
};

const editMaterial = async (req) => {
  const { material_id } = req.params;
  const { material, panjang, lebar, tebal, harga, berat } = req.body;

  const checkMaterial = await Material.findOne({ where: { id: material_id } });
  if (!checkMaterial) {
    throw new NotFoundError(`Tidak ada Bahan dengan id ${material_id}`);
  }

  if (checkMaterial.material !== material) {
    const checkDuplicate = await Material.findOne({
      where: { material, id: { [Op.not]: material_id } },
    });
    if (checkDuplicate) {
      throw new BadRequestError(`Bahan sudah ada!`);
    }
  }


  const result = await Material.update(
    { material, panjang, lebar, tebal, harga, berat },
    { where: { id: material_id } }
  );

  return result;
};

const readAllMaterial = async (req) => {
  const { limit = 5, page = 1 } = req.query;
  const user = req.user;
  let where = {};

  if (user.role === ROLES.BUYER) {
    where = {
      status: VARIANT.ACTIVE,
    };
  }

  const totalMaterial = await Material.count({ where });
  const totalPages = Math.ceil(totalMaterial / limit);
  const offset = (page - 1) * limit;

  const result = await Material.findAll({
    where,
    limit: Number(limit),
    offset: Number(offset),
  });

  return {
    limitPage: Number(limit),
    pageNumber: Number(page),
    totalPage: totalPages,
    totalRows: totalMaterial,
    data: result,
  };
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

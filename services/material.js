const { Material, Category } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { VARIANT, ROLES } = require("../utils/enum");
const { Op } = require("sequelize");

const createMaterial = async (req) => {
  const { category_id, material } = req.body;

  const checkCategory = await Category.findOne({ where: { id: category_id } });
  if (!checkCategory) {
    throw new NotFoundError(`Tidak ada cetegory dengan id: ${category_id}`);
  }

  const checkDuplicate = await Material.findOne({
    where: { category_id, material },
  });

  if (checkDuplicate) {
    throw new BadRequestError(
      `Material dengan category id ${category_id} sudah ada!`
    );
  }

  const result = await Material.create({
    category_id,
    material,
    status: VARIANT.ACTIVE,
  });

  return result;
};

const editMaterial = async (req) => {
  const { material_id } = req.params;
  const { category_id, material } = req.body;

  const checkMaterial = await Material.findOne({ where: { id: material_id } });
  if (!checkMaterial) {
    throw new NotFoundError(`Tidak ada Bahan dengan id ${material_id}`);
  }

  const checkDuplicate = await Material.findOne({
    where: { category_id, material },
    id: { [Op.ne]: material_id },
  });

  if (checkDuplicate) {
    throw new BadRequestError(`Bahan sudah ada!`);
  }

  const result = await Material.update(
    { category_id, material },
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
    include: [{ model: Category, as: "category" }],
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

  const result = await Material.findOne({
    where,
    include: [{ model: Category, as: "category" }],
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

const readByCategory = async (req) => {
  const { category_id } = req.params;

  const result = await Material.findAll({
    where: { category_id, status: VARIANT.ACTIVE },
    include: [{ model: Category, as: "category" }],
  });

  if (result <= 0) {
    throw new NotFoundError(
      `Tidak ada size dengan kategori id: ${category_id}`
    );
  }

  return result;
};

module.exports = {
  createMaterial,
  editMaterial,
  readAllMaterial,
  readOneMaterial,
  destroyMaterial,
  readByCategory,
};

const { NotFoundError, BadRequestError } = require("../errors");
const { Custom_order, User, Material, Size, Category } = require("../models");
const { CUSTOM_ORDER, VARIANT } = require("../utils/enum");
const { Op } = require("sequelize");

const createCustomOrder = async (req) => {
  const user = req.user;
  const { category_id, size_id, material_id, keterangan } = req.body;

  const checkCategory = await Category.findOne({
    where: { id: category_id },
  });
  if (!checkCategory) {
    throw new NotFoundError(`Tidak ada Category dengan id ${category_id}`);
  }

  const checkSize = await Size.findOne({
    where: { id: size_id, status: VARIANT.ACTIVE },
  });
  if (!checkSize) {
    throw new NotFoundError(`Tidak ada Size dengan id ${category_id}`);
  }

  const checkMaterial = await Size.findOne({
    where: { id: material_id, status: VARIANT.ACTIVE },
  });
  if (!checkMaterial) {
    throw new NotFoundError(`Tidak ada Size dengan id ${material_id}`);
  }

  const result = await Custom_order.create({
    user_id: user.id,
    category_id,
    size_id,
    material_id,
    keterangan,
    status: CUSTOM_ORDER.WAITING,
  });

  return result;
};

const readByAdmin = async (req) => {
  const { start_date, end_date, status } = req.query;

  if (status) {
    const result = await Custom_order.findAll({
      where: {
        status,
      },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Material,
          as: "material",
        },
        {
          model: Size,
          as: "size",
        },
      ],
    });

    return result;
  }

  if (start_date && end_date && status) {
    const result = await Custom_order.findAll({
      where: {
        status,
        createdAt: {
          [Op.between]: [
            new Date(start_date).setHours(0, 0, 0),
            new Date(end_date).setHours(23, 59, 59),
          ],
        },
      },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Material,
          as: "material",
        },
        {
          model: Size,
          as: "size",
        },
      ],
    });

    return result;
  }

  const result = await Custom_order.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Size,
        as: "size",
      },
    ],
  });

  return result;
};

const readByUser = async (req) => {
  const user = req.user;

  const result = await Custom_order.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Size,
        as: "size",
      },
    ],
  });

  return result;
};

const cancelByUser = async (req) => {
  const user = req.user;
  const { custom_order_id } = req.params;

  const checkStatus = await Custom_order.findOne({
    where: { id: custom_order_id, user_id: user.id },
  });

  if (!checkStatus) {
    throw new NotFoundError(
      `Tidak ada custom order dengan id: ${custom_order_id}`
    );
  }

  if (checkStatus.status !== CUSTOM_ORDER.WAITING) {
    throw new BadRequestError(`Tidak dapat melakukan cancel order!`);
  }

  const result = await Custom_order.update(
    { status: CUSTOM_ORDER.CANCELLED },
    { where: { id: custom_order_id, user_id: user.id } }
  );

  return result;
};

const cancelByAdmin = async (req) => {
  const { custom_order_id } = req.params;

  const checkStatus = await Custom_order.findOne({
    where: { id: custom_order_id },
  });

  if (!checkStatus) {
    throw new NotFoundError(
      `Tidak ada custom order dengan id: ${custom_order_id}`
    );
  }

  if (
    checkStatus.status !== CUSTOM_ORDER.WAITING &&
    checkStatus.status !== CUSTOM_ORDER.ON_PROCESS
  ) {
    throw new BadRequestError(`Tidak dapat melakukan cancel order!`);
  }

  const result = await Custom_order.update(
    { status: CUSTOM_ORDER.REJECTED },
    { where: { id: custom_order_id } }
  );

  return result;
};
module.exports = {
  createCustomOrder,
  readByAdmin,
  readByUser,
  cancelByUser,
  cancelByAdmin,
};

const { NotFoundError, BadRequestError } = require("../errors");
const {
  Custom_order,
  User,
  Material,
  Size,
  Category,
  Custom_order_detail,
  Transaction_custom_order,
  Payment,
} = require("../models");
const { CUSTOM_ORDER, VARIANT, TRANSACTION } = require("../utils/enum");
const { Op } = require("sequelize");

const createCustomOrder = async (req) => {
  const user = req.user;
  const { category_id, size_id, material_id, keterangan, payment_id } =
    req.body;

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
    throw new NotFoundError(`Tidak ada Size dengan id ${size_id}`);
  }

  const checkMaterial = await Size.findOne({
    where: { id: material_id, status: VARIANT.ACTIVE },
  });
  if (!checkMaterial) {
    throw new NotFoundError(`Tidak ada Size dengan id ${material_id}`);
  }

  const checkPayment = await Payment.findOne({ where: { id: payment_id } });
  if (!checkPayment) {
    throw new NotFoundError(`Tidak ada Payment dengan id ${payment_id}`);
  }

  const result = await Custom_order.create({
    user_id: user.id,
    category_id,
    size_id,
    color_id: null,
    material_id,
    keterangan,
    status: CUSTOM_ORDER.WAITING,
  });

  await Custom_order_detail.create({ custom_order_id: result.id, price: 0 });
  await Transaction_custom_order.create({
    user_id: user.id,
    custom_order_id: result.id,
    payment_id: null,
    status: TRANSACTION.PENDING,
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
        {
          model: Custom_order_detail,
          as: "custom_order_detail",
        },
        {
          model: Transaction_custom_order,
          as: "transaction_custom_order",
        },
        {
          model: Payment,
          as: "payment",
        },
      ],
    });

    return result;
  }

  if (start_date && end_date) {
    const result = await Custom_order.findAll({
      where: {
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
        {
          model: Custom_order_detail,
          as: "custom_order_detail",
        },
        {
          model: Transaction_custom_order,
          as: "transaction_custom_order",
        },
        {
          model: Payment,
          as: "payment",
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
        {
          model: Custom_order_detail,
          as: "custom_order_detail",
        },
        {
          model: Transaction_custom_order,
          as: "transaction_custom_order",
        },
        {
          model: Payment,
          as: "payment",
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
      {
        model: Custom_order_detail,
        as: "custom_order_detail",
      },
      {
        model: Transaction_custom_order,
        as: "transaction_custom_order",
      },
      {
        model: Payment,
        as: "payment",
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
      {
        model: Custom_order_detail,
        as: "custom_order_detail",
      },
      {
        model: Transaction_custom_order,
        as: "transaction_custom_order",
      },
      {
        model: Payment,
        as: "payment",
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

  await Transaction_custom_order.update(
    { status: TRANSACTION.CANCELLED },
    { where: { custom_order_id } }
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
  await Transaction_custom_order.update(
    { status: TRANSACTION.CANCELLED },
    { where: { custom_order_id } }
  );

  return result;
};

const acceptByAdmin = async (req) => {
  const { custom_order_id } = req.params;

  const checkOrder = await Custom_order.findOne({
    where: { id: custom_order_id },
  });

  if (!checkOrder) {
    throw new NotFoundError(
      `Tidak ada custom order dengan id: ${custom_order_id}`
    );
  }

  if (checkOrder.status !== CUSTOM_ORDER.WAITING) {
    throw new BadRequestError(`Pesanan sudah dalam perjalanan / dibatalkan`);
  }

  const result = await Custom_order.update(
    { status: CUSTOM_ORDER.ON_PROCESS },
    { where: { id: custom_order_id } }
  );

  return result;
};

const updateByAdmin = async (req) => {
  const { custom_order_id } = req.params;

  const checkOrder = await Custom_order.findOne({
    where: { id: custom_order_id },
  });

  if (!checkOrder) {
    throw new NotFoundError(
      `Tidak ada custom order dengan id: ${custom_order_id}`
    );
  }

  if (checkOrder.status !== CUSTOM_ORDER.ON_PROCESS) {
    throw new BadRequestError(`Pesanan sudah selesai / dikirim / dibatalkan`);
  }

  const result = await Custom_order.update(
    { status: CUSTOM_ORDER.SHIPPING },
    { where: { id: custom_order_id } }
  );

  return result;
};

const createPriceAdmin = async (req) => {
  const { custom_order_id } = req.params;
  const { price } = req.body;

  const checkOrder = await Custom_order.findOne({
    where: { id: custom_order_id },
  });

  if (!checkOrder) {
    throw new NotFoundError(
      `Tidak ada custom order dengan id: ${custom_order_id}`
    );
  }

  if (checkOrder.status !== CUSTOM_ORDER.ON_PROCESS) {
    throw new BadRequestError(`Tidak dapat melakukan edit harga!`);
  }

  const result = await Custom_order_detail.update(
    { price },
    { where: { custom_order_id } }
  );

  return result;
};

module.exports = {
  createCustomOrder,
  readByAdmin,
  readByUser,
  cancelByUser,
  cancelByAdmin,
  acceptByAdmin,
  updateByAdmin,
  createPriceAdmin,
};

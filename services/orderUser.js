const { OrderUser, OrderUserItem } = require("../models");
const { BadRequestError } = require("../errors");

const create = async (req) => {
  if (!req.body) {
    throw new BadRequestError(`Body is empty!`);
  }

  if (!Array.isArray(req.body.orders) || req.body.orders.length === 0) {
    throw new BadRequestError(`Orders array is empty or not provided!`);
  }

  const userCreated = await OrderUser.create(req.body);

  req.body.orders.forEach(async (data) => {
    await OrderUserItem.create({
      order_user_id: userCreated.id,
      nama: data.nama,
      qty: data.qty,
      catatan: data.catatan,
      harga: data.harga,
    });
  });

  return userCreated;
};

module.exports = {
  create,
};

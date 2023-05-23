const { Address, User, Province, City } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");

const createAddress = async (req) => {
  const user = req.user;
  const { province_id, city_id, address } = req.body;

  const checkProvince = await Province.findOne({ where: { id: province_id } });
  if (!checkProvince) {
    throw new NotFoundError(`Tidak ada province dengan id: ${province_id}`);
  }

  const checkCity = await City.findOne({ where: { id: city_id } });
  if (!checkCity) {
    throw new NotFoundError(`Tidak ada city dengan id: ${city_id}`);
  }

  const checkAddress = await Address.findOne({ where: { user_id: user.id } });
  if (checkAddress) {
    throw new BadRequestError(`Anda hanya boleh memiliki 1 alamat`);
  }

  const result = await Address.create({
    user_id: user.id,
    province_id,
    city_id,
    address,
  });

  await User.update({ address_id: result.id }, { where: { id: user.id } });

  return result;
};

const editAddress = async (req) => {
  const { address_id } = req.query;
  const { province_id, city_id, address } = req.body;

  const checkProvince = await Province.findOne({ where: { id: province_id } });
  if (!checkProvince) {
    throw new NotFoundError(`Tidak ada province dengan id: ${province_id}`);
  }

  const checkCity = await City.findOne({ where: { id: city_id } });
  if (!checkCity) {
    throw new NotFoundError(`Tidak ada city dengan id: ${city_id}`);
  }

  const checkAddress = await Address.findOne({ where: { id: address_id } });
  if (!checkAddress) {
    throw new NotFoundError(`Tidak ada address dengan id: ${address_id}`);
  }

  const result = await Address.update(
    { province_id, city_id, address },
    { where: { id: address_id } }
  );

  return result;
};

const getAddressUser = async (req) => {
  const user = req.user;

  const result = await Address.findOne({ where: { user_id: user.id } });

  return result;
};

module.exports = { createAddress, editAddress, getAddressUser };

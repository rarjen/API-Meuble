const { Menu } = require("../models");
const { NotFoundError } = require("../errors");

const create = async (req) => {
  const result = await Menu.create(req.body);

  return result;
};

const getAll = async () => {
  const result = await Menu.findAll();

  return result;
};

const getOne = async (req) => {
  const result = await Menu.findOne({ where: { id: req.params.id } });
  if (!result) {
    throw new NotFoundError(`Can't find food with id ${req.params.id}`);
  }
  return result;
};

const update = async (req) => {
  const checkExist = await Menu.findOne(req.body, {
    where: { id: req.params.id },
  });
  if (!checkExist) {
    throw new NotFoundError(`Can't find food with id ${req.params.id}`);
  }

  const result = await Menu.update(req.body, { where: { id: req.params.id } });
  return result;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
};

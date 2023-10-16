const { CategoryMenu } = require("../models");
const { NotFoundError } = require("../errors");

const create = async (req) => {
  const result = await CategoryMenu.create(req.body);

  return result;
};

const getAll = async () => {
  const result = await CategoryMenu.findAll();

  return result;
};

const getOne = async (req) => {
  const result = await CategoryMenu.findOne({ where: { id: req.params.id } });
  if (!result) {
    throw new NotFoundError(`Can't find food with id ${req.params.id}`);
  }
  return result;
};

const update = async (req) => {
  const checkExist = await CategoryMenu.findOne(req.body, {
    where: { id: req.params.id },
  });
  if (!checkExist) {
    throw new NotFoundError(`Can't find food with id ${req.params.id}`);
  }

  const result = await CategoryMenu.update(req.body, {
    where: { id: req.params.id },
  });
  return result;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
};

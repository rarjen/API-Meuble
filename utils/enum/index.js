const PRODUCT = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const COURRIER = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const PAYMENT = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const CATEGORY = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  BUYER: "BUYER",
};

const TRANSACTION = {
  CANCELLED: "CANCELLED",
  PAID: "PAID",
  PENDING: "PENDING",
};

const CUSTOM_ORDER = {
  WAITING: "WAITING",
  ON_PROCESS: "ON PROCESS",
  REJECTED: "REJECTED",
  DONE: "DONE",
  CANCELLED: "CANCELLED",
};

const VARIANT = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const STATUS_TRANSACTION = {
  ON_PROCESS: "ON_PROCESS",
  DONE: "DONE",
};

const ORDER_TYPE = {
  CUSTOM: "CUSTOM",
  NORMAL: "NORMAL",
};

module.exports = {
  COURRIER,
  TRANSACTION,
  PRODUCT,
  ROLES,
  CUSTOM_ORDER,
  VARIANT,
  PAYMENT,
  STATUS_TRANSACTION,
  CATEGORY,
  ORDER_TYPE,
};

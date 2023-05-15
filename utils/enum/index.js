const PRODUCT = {
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
  SHIPPING: "SHIPPING",
  DONE: "DONE",
};

const VARIANT = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

module.exports = { TRANSACTION, PRODUCT, ROLES, CUSTOM_ORDER, VARIANT };

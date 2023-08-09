const { NotFoundError, BadRequestError } = require("../errors");
const {
  Transaction,
  Payment,
  Courrier,
  User,
  Size,
  Material,
  Category,
  Image_transaction,
  Coordinate,
  Address,
  Role,
  Reference_img,
} = require("../models");
const generateInvoiceNumber = require("../utils/generateInvoice");
const estimation = require("../utils/costEstimation");
const calculateCodPrice = require("../utils/calculateOngkir");
const { TRANSACTION, CUSTOM_ORDER, ORDER_TYPE } = require("../utils/enum");
const querySort = require("../utils/querySort");

const createTransaction = async (req) => {
  const {
    category_id,
    payment_id,
    size_id,
    material_id,
    qty,
    note,
    courrier_id,
  } = req.body;
  const user = req.user;

  const detailUser = await User.findOne({
    where: {
      id: user.id,
    },
    include: [
      {
        model: Address,
        as: "address",
        include: [
          {
            model: Coordinate,
            as: "coordinate",
          },
        ],
      },
    ],
  });

  const detailAdmin = await User.findOne({
    include: [
      {
        model: Address,
        as: "address",
        include: [
          {
            model: Coordinate,
            as: "coordinate",
          },
        ],
      },
      {
        model: Role,
        as: "role",
        where: {
          role: "ADMIN",
        },
      },
    ],
  });

  if (!detailUser.mobile || !detailUser.address) {
    throw new BadRequestError("Harap isi alamat/mobile");
  }

  const checkPayment = await Payment.findOne({ where: { id: payment_id } });
  if (!checkPayment) {
    throw new NotFoundError(`Tidak ada payment dengan id: ${payment_id}`);
  }
  const checkMaterial = await Material.findOne({ where: { id: material_id } });
  if (!checkMaterial) {
    throw new NotFoundError(`Tidak ada material dengan id: ${material_id}`);
  }

  const checkSize = await Size.findOne({ where: { id: size_id } });
  if (!checkSize) {
    throw new NotFoundError(`Tidak ada size dengan id: ${size_id}`);
  }

  const checkCourrier = await Courrier.findOne({ where: { id: courrier_id } });
  if (!checkCourrier) {
    throw new NotFoundError(`Tidak ada courrier dengan id: ${courrier_id}`);
  }

  const costExtimation = await estimation(
    checkSize.panjang,
    checkSize.lebar,
    checkSize.tinggi,
    checkMaterial.panjang,
    checkMaterial.lebar,
    checkMaterial.tebal,
    checkMaterial.harga,
    checkMaterial.berat
  );

  const ongkosKirim = await calculateCodPrice(
    costExtimation.weight,
    detailUser.address.coordinate.lat,
    detailUser.address.coordinate.lng,
    detailAdmin.address.coordinate.lat,
    detailAdmin.address.coordinate.lng
  );

  const ongkosTukang = 100000;

  const result = await Transaction.create({
    user_id: user.id,
    courrier_id,
    total_weight: costExtimation.weight,
    category_id,
    payment_id,
    size_id,
    material_id,
    invoice_number: generateInvoiceNumber(),
    qty,
    note,
    total: costExtimation.estimasiHarga,
    ongkosTukang,
    ongkir: ongkosKirim,
    grandTotal:
      (costExtimation.estimasiHarga + ongkosTukang) * qty + ongkosKirim,
    statusOrder: CUSTOM_ORDER.WAITING,
    statusPayment: TRANSACTION.PENDING,
    orderType: ORDER_TYPE.CUSTOM,
  });

  return result;
};

const cancelOrderUser = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }
  if (
    checkTransaction.statusPayment !== TRANSACTION.PENDING ||
    checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING
  ) {
    throw new BadRequestError("Tidak dapat membatalkan pesanan");
  }

  const result = await Transaction.update(
    {
      statusOrder: CUSTOM_ORDER.CANCELLED,
      statusPayment: TRANSACTION.CANCELLED,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const cancelOrderAdmin = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }
  if (
    checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING ||
    checkTransaction.statusPayment !== TRANSACTION.PENDING
  ) {
    throw new BadRequestError("Tidak dapat membatalkan pesanan");
  }

  const result = await Transaction.update(
    {
      statusOrder: CUSTOM_ORDER.REJECTED,
      statusPayment: TRANSACTION.CANCELLED,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const acceptCustomOrderAdmin = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada transaction custom dengan id: ${transaction_custom_order_id}`
    );
  }
  if (checkTransaction.statusOrder !== CUSTOM_ORDER.WAITING) {
    throw new BadRequestError("Tidak dapat menerima pesanan");
  }

  const result = await Transaction.update(
    {
      statusOrder: CUSTOM_ORDER.ON_PROCESS,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const updateCustomTransactionAdmin = async (req) => {
  const { transaction_custom_order_id } = req.params;
  const { courrier_id, total_weight } = req.body;
  const user = req.user;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
  });
  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  const checkCourrier = await Courrier.findOne({ where: { id: courrier_id } });
  if (!checkCourrier) {
    throw new NotFoundError(`Tidak ada courrier dengan id: ${courrier_id}`);
  }

  const checkPayment = await Payment.findOne({
    where: { id: checkTransaction.payment_id },
  });

  if (checkPayment.payment !== "COD" && checkCourrier !== "Internal Delivery") {
    throw new BadRequestError(
      `Pembayaran COD hanya tersedia untuk Internal Delivery`
    );
  }

  const getAdmin = await User.findOne({
    where: { id: user.id },
    include: [
      {
        model: Address,
        as: "address",
        include: [{ model: Coordinate, as: "coordinate" }],
      },
    ],
  });

  const getUser = await User.findOne({
    where: { id: checkTransaction.user_id },
    include: [
      {
        model: Address,
        as: "address",
        include: [{ model: Coordinate, as: "coordinate" }],
      },
    ],
  });

  const ongkirCost = calculateCodPrice(
    total_weight,
    getAdmin.address.coordinate.lat,
    getAdmin.address.coordinate.lng,
    getUser.address.coordinate.lat,
    getUser.address.coordinate.lng
  );

  const totalPayment = checkTransaction.grandTotal + ongkirCost;

  const result = await Transaction.update(
    {
      courrier_id,
      total_weight,
      ongkir: ongkirCost,
      grandTotal: totalPayment,
    },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const updateStatusPayment = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
    include: [
      { model: Payment, as: "payment" },
      { model: Image_transaction, as: "img_transaction" },
    ],
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  if (
    checkTransaction.statusOrder !== CUSTOM_ORDER.ON_PROCESS ||
    checkTransaction.statusPayment !== TRANSACTION.PENDING
  ) {
    throw new BadRequestError(`Tidak dapat update status pembayaran status!`);
  }

  if (
    !checkTransaction.img_transaction &&
    checkTransaction.payment.payment !== "COD"
  ) {
    throw new BadRequestError("Tidak dapat update status pembayaran GAMBAR!");
  }

  const result = await Transaction.update(
    { statusPayment: TRANSACTION.PAID },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const inputResi = async (req) => {
  const { transaction_custom_order_id } = req.params;
  const { nomerResi } = req.body;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  if (checkTransaction.statusPayment !== TRANSACTION.PAID) {
    throw new BadRequestError(`Tidak dapat melakukan input resi`);
  }

  // const checkCourrier = await Courrier.findOne({
  //   where: { id: checkTransaction.courrier_id },
  // });

  // if (checkCourrier.courrier === "Internal Delivery") {
  //   throw new BadRequestError(`Tidak dapat melakukan input resi`);
  // }
  const result = await Transaction.update(
    { nomerResi, statusOrder: "ON_DELIVERY" },

    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const updateDone = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const checkTransaction = await Transaction.findOne({
    where: { id: transaction_custom_order_id },
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  if (
    checkTransaction.statusOrder !== CUSTOM_ORDER.ON_PROCESS ||
    checkTransaction.statusPayment !== TRANSACTION.PAID
  ) {
    throw new BadRequestError("Tidak dapat melakukan update!");
  }

  const result = await Transaction.update(
    { statusOrder: CUSTOM_ORDER.DONE },
    { where: { id: transaction_custom_order_id } }
  );

  return result;
};

const readTransactionAdmin = async (req) => {
  const {
    searchInvoice,
    page = 1,
    limit = 10,
    status,
    statusTransaction,
    sort,
  } = req.query;

  const dataSort = querySort(sort);

  let where = {
    orderType: ORDER_TYPE.CUSTOM,
  };

  if (status) {
    where = {
      ...where,
      statusOrder: status,
    };
  }

  if (statusTransaction) {
    where = {
      ...where,
      statusPayment: statusTransaction,
    };
  }

  if (searchInvoice) {
    where = {
      ...where,
      invoice_number: { [Op.like]: "%" + searchInvoice + "%" },
    };
  }

  const pageNumber = parseInt(page);
  const limitPage = parseInt(limit);
  const offset = pageNumber * limitPage - limitPage;
  const allTransaction = await Transaction.count({ where });
  const totalPage = Math.ceil(allTransaction / limit);

  const result = await Transaction.findAll({
    offset: offset,
    limit: limitPage,
    where,
    include: [
      {
        model: User,
        as: "user",
        include: [
          {
            model: Address,
            as: "address",
          },
        ],
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Category,
        as: "category",
      },
      {
        model: Size,
        as: "size",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Reference_img,
        as: "reference_img",
      },
      {
        model: Image_transaction,
        as: "img_transaction",
      },
    ],
    order: dataSort,
  });

  return {
    data: result,
    pageNumber: pageNumber,
    limitPage: limitPage,
    totalRows: allTransaction,
    totalPage: totalPage,
  };
};

const readTransactionUser = async (req) => {
  const user = req.user;

  const result = await Transaction.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Category,
        as: "category",
      },
      {
        model: Size,
        as: "size",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Reference_img,
        as: "reference_img",
      },
      {
        model: Image_transaction,
        as: "img_transaction",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return result;
};

const readOneTransaction = async (req) => {
  const { transaction_custom_order_id } = req.params;

  const result = await Transaction.findAll({
    where: { id: transaction_custom_order_id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Payment,
        as: "payment",
      },
      {
        model: Courrier,
        as: "courrier",
      },
      {
        model: Category,
        as: "category",
      },
      {
        model: Size,
        as: "size",
      },
      {
        model: Material,
        as: "material",
      },
      {
        model: Reference_img,
        as: "reference_img",
      },
      {
        model: Image_transaction,
        as: "img_transaction_custom",
      },
    ],
  });

  return result;
};

module.exports = {
  createTransaction,
  acceptCustomOrderAdmin,
  updateCustomTransactionAdmin,
  updateStatusPayment,
  inputResi,
  cancelOrderUser,
  cancelOrderAdmin,
  updateDone,
  readTransactionAdmin,
  readTransactionUser,
  readOneTransaction,
};

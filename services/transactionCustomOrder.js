const { NotFoundError, BadRequestError } = require("../errors");
const {
  Transaction_custom_order,
  Transaction,
  Payment,
  Courrier,
  User,
  Size,
  Material,
  Category,
  Image_transaction_custom_order,
  Coordinate,
  Address,
  Role,
} = require("../models");
const { TRANSACTION, CUSTOM_ORDER, ORDER_TYPE } = require("../utils/enum");

const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}${randomDigits}`;
};
let muchMaterial = 0;
const estimation = (
  panjangMebel,
  lebarMebel,
  tinggiMebel,
  panjangMaterial,
  lebarMaterial,
  ketebalanMaterial,
  hargaPerBalok
) => {
  const volumeMaterial =
    (panjangMebel * lebarMebel * tinggiMebel) /
    (panjangMaterial * lebarMaterial * ketebalanMaterial);

  // Hitung jumlah material yang dibutuhkan
  const jumlahMaterial = Math.ceil(volumeMaterial); // Bulatkan ke atas
  muchMaterial = jumlahMaterial;
  // Hitung estimasi harga
  const estimasiHarga = jumlahMaterial * hargaPerBalok;

  return estimasiHarga;
};

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateCodPrice(weight, lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius bumi dalam kilometer
  const lat1Float = parseFloat(lat1);
  const lon1Float = parseFloat(lon1);
  const lat2Float = parseFloat(lat2);
  const lon2Float = parseFloat(lon2);
  const dLat = toRadians(lat2Float - lat1Float);
  const dLon = toRadians(lon2Float - lon1Float);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1Float)) *
      Math.cos(toRadians(lat2Float)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.round(R * c);

  const total = (distance * 500 + Math.round(weight / 1000) * 5000) / 2;

  return total;
}

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

  const costExtimation = estimation(
    checkSize.panjang,
    checkSize.lebar,
    checkSize.tinggi,
    checkMaterial.panjang,
    checkMaterial.lebar,
    checkMaterial.tebal,
    checkMaterial.harga
  );

  const weight =
    muchMaterial * checkMaterial.berat < 1000
      ? 1000
      : muchMaterial * checkMaterial.berat;

  const ongkosKirim = calculateCodPrice(
    weight,
    detailUser.address.coordinate.lat,
    detailUser.address.coordinate.lng,
    detailAdmin.address.coordinate.lat,
    detailAdmin.address.coordinate.lng
  );

  const ongkosTukang = 100000;

  const result = await Transaction.create({
    user_id: user.id,
    courrier_id,
    total_weight: weight,
    category_id,
    payment_id,
    size_id,
    material_id,
    invoice_number: generateInvoiceNumber(),
    qty,
    note,
    total: costExtimation,
    ongkosTukang,
    ongkir: ongkosKirim,
    grandTotal: (costExtimation + ongkosTukang) * qty + ongkosKirim,
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
  });

  if (!checkTransaction) {
    throw new NotFoundError(
      `Tidak ada custom transaksi dengan id: ${transaction_custom_order_id}`
    );
  }

  if (
    checkTransaction.statusOrder !== CUSTOM_ORDER.ON_PROCESS &&
    checkTransaction.statusPayment !== TRANSACTION.PENDING
  ) {
    throw new BadRequestError(`Tidak dapat update status pembayaran!`);
  }

  const checkPicture = await Image_transaction_custom_order.findOne({
    where: { transaction_id: transaction_custom_order_id },
  });

  if (!checkPicture) {
    throw new BadRequestError(`Tidak dapat update status pembayaran!`);
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

  const checkCourrier = await Courrier.findOne({
    where: { id: checkTransaction.courrier_id },
  });

  if (checkCourrier.courrier === "Internal Delivery") {
    throw new BadRequestError(`Tidak dapat melakukan input resi`);
  }
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
  } = req.query;

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
        model: Image_transaction_custom_order,
        as: "img_transaction_custom",
      },
    ],
    order: [["createdAt", "DESC"]],
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
        model: Image_transaction_custom_order,
        as: "img_transaction_custom",
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
        model: Image_transaction_custom_order,
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

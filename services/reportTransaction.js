const { Transaction, Product } = require("../models");
const { NotFoundError } = require("../errors");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const folderPath = path.join(__dirname, "../report");
const { Op } = require("sequelize");
const { STATUS_TRANSACTION } = require("../utils/enum");

const createTransactionExcel = (
  start_date,
  end_date,
  transactions,
  filePath
) => {
  const workbook = XLSX.utils.book_new();

  const data = transactions.map((transaction) => [
    transaction.invoice_number,
    transaction.createdAt,
    transaction.product.brand,
    transaction.product.nama,
    transaction.qty,
    transaction.total,
    transaction.ongkir,
    transaction.grandTotal,
  ]);

  // Menghitung total
  const total = transactions.reduce((acc, transaction) => {
    return acc + transaction.total;
  }, 0);

  const ongkir = transactions.reduce((acc, transaction) => {
    return acc + transaction.ongkir;
  }, 0);

  const grandTotal = transactions.reduce((acc, transaction) => {
    return acc + transaction.grandTotal;
  }, 0);

  const worksheet = XLSX.utils.aoa_to_sheet([
    ["Laporan Transaksi"],
    [`${start_date} s/d ${end_date}`],
    [],
    [
      "Invoice",
      "Tanggal Pembelian",
      "Brand",
      "Nama Barang",
      "Jumlah",
      "Total",
      "Ongkir",
      "Sub Total",
    ],
    ...data,
    [], // Baris kosong sebagai pemisah
    ["Grand Total", "", "", "", "", total, ongkir, grandTotal], // Menambahkan total ke file Excel
  ]);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Transaksi");

  XLSX.writeFile(workbook, filePath);

  return filePath;
};

const createUniqueFileName = (start_date, end_date) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const fileName = `${start_date}_${end_date}_${timestamp}_${random}`;
  return fileName;
};

const downloadTransactionReport = async (req) => {
  const { start_date, end_date } = req.query;

  const result = await Transaction.findAll({
    where: {
      statusTransaction: STATUS_TRANSACTION.DONE,
      createdAt: {
        [Op.between]: [
          new Date(start_date).setHours(0, 0, 0),
          new Date(end_date).setHours(23, 59, 59),
        ],
      },
    },
    include: [{ model: Product, as: "product" }],
  });

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  if (result <= 0) {
    throw new NotFoundError(
      `Tidak ada laporan tersedia pada tangal ${start_date} - ${end_date}`
    );
  }

  const excelPath = createTransactionExcel(
    start_date,
    end_date,
    result,
    `${folderPath}/transaction_report-${createUniqueFileName(
      start_date,
      end_date
    )}.xlsx`
  );

  return excelPath;
};

module.exports = { downloadTransactionReport };

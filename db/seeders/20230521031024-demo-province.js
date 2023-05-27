"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Provinces",
      [
        {
          id: 1,
          province: "Bali",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          province: "Bangka Belitung",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          province: "Banten",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          province: "Bengkulu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          province: "DI Yogyakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          province: "DKI Jakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          province: "Gorontalo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          province: "Jambi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          province: "Jawa Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          province: "Jawa Tengah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          province: "Jawa Timur",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          province: "Kalimantan Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          province: "Kalimantan Selatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          province: "Kalimantan Tengah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          province: "Kalimantan Timur",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 16,
          province: "Kalimantan Utara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 17,
          province: "Kepulauan Riau",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 18,
          province: "Lampung",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 19,
          province: "Maluku",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 20,
          province: "Maluku Utara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 21,
          province: "Nanggroe Aceh Darussalam (NAD)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 22,
          province: "Nusa Tenggara Barat (NTB)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 23,
          province: "Nusa Tenggara Timur (NTT)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 24,
          province: "Papua",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 25,
          province: "Papua Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 26,
          province: "Riau",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 27,
          province: "Sulawesi Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 28,
          province: "Sulawesi Selatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 29,
          province: "Sulawesi Tengah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 30,
          province: "Sulawesi Tenggara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 31,
          province: "Sulawesi Utara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 32,
          province: "Sumatera Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 33,
          province: "Sumatera Selatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 34,
          province: "Sumatera Utara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Provinces", null, {});
  },
};
